import express from "express";
const router = express.Router();
import * as userController from "../controllers/userContoller.js";
import { consumeAuthQueue } from "../service/consumer.js";

(async () => {
  console.log("Starting auth service...");
  await consumeAuthQueue();
})();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);

export default router;
