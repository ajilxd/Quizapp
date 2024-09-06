import express from "express";
import { PORT, MONGODBURI } from "./config.js";
import globalErrorHandler from "./src/utils/errorHandler.js";
import quizRouter from "./src/routes/quizRoute.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", quizRouter);
app.use(globalErrorHandler);

app.use(async (req, res, next) => {
  console.log(req.body);
});

async function mongodbConnect(req, res) {
  try {
    await mongoose.connect(MONGODBURI);
    console.log("Connected to mongodb database succesfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
mongodbConnect();

app.listen(PORT, () => {
  console.log(`quiz service  started running ${PORT}`);
});
