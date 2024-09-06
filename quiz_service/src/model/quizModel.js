import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
    },
  ],
});

const QuizModel = mongoose.model("Quiz", quizSchema);
export default QuizModel;
