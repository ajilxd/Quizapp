import express from "express";
import { PORT } from "./config.js";
import { quizProxy, userProxy } from "./proxies.js";
import winston from "winston";
const { combine, colorize, simple } = winston.format;
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: combine(colorize(), simple()) }),
  ],
});
const app = express();

app.use("/user", userProxy);
app.use("/quiz", quizProxy);

app.listen(PORT, () => {
  logger.info(`api gateway started running on ${PORT}`);
});
