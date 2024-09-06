import express from "express";
import { PORT, MONGODBURI } from "./config.js";
import globalErrorHandler from "./src/utils/errorHandler.js";
import userRouter from "./src/routes/userRoute.js";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use(globalErrorHandler);

// app.use(async (req, res, next) => {
//   console.log(req.body);
// });

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
  console.log(`user service  started running ${PORT}`);
});
