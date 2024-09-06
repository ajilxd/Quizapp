import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const MONGODBURI = process.env.MONGODBURI;

export const JWT_SECRET = process.env.JWT_SECRET;

export const RABBITMQURI = process.env.RABBITMQURI;
