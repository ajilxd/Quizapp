import catchAsync from "../utils/catchAsyc.js";
import { GEMINI_API_KEY } from "../../config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import QuizModel from "../model/quizModel.js";
import { sendMessage } from "../service/publisher.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateQuiz = catchAsync(async (req, res, next) => {
  const topics = ["science", "history", "literature", "math", "geography"];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `Give me a random set of 10 quiz questions on the topic of ${randomTopic} with 4 options each and answers separately in JSON format.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  let text = response.text();

  // Clean up the response
  text = text.replace(/```json|```/g, "");

  let questions;
  try {
    questions = JSON.parse(text).questions;
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to parse JSON." });
  }

  const data = questions.map((item) => ({
    question: item.question,
    options: item.options,
    answer: item.answer,
  }));

  const { id } = req.user;

  await QuizModel.create({ user_id: id, questions: data });

  // Respond with the filtered data (excluding answers)
  const filteredData = data.map(({ question, options }) => ({
    question,
    options,
  }));

  res.status(200).json(filteredData);
});

export const SubmitQuiz = catchAsync(async function (req, res, next) {
  let score = 0;
  const { id } = req.user;
  const { questions } = await QuizModel.findOne({ user_id: id });
  console.log(questions);
  const { answers } = req.body;
  console.log(`req body at submit quiz`, req.body);
  if (!answers) return res.status(400).json("Bad request");
  questions.map((i, index) => {
    if (answers[index] === i.answer) score++;
  });

  await sendMessage("scores_queue", JSON.stringify({ _id: id, score: score }));

  res.status(200).json(`Your score is ${score}`);
});
