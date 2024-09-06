import express from "express";
const router = express.Router();
import * as quizController from "../controllers/quizController.js";
import Authenticate from "../utils/Authenticate.js";

router.get("/getquiz", Authenticate, quizController.generateQuiz);
router.post("/submitquiz", Authenticate, quizController.SubmitQuiz);
export default router;
