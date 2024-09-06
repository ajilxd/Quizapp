import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const createToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const checkUser = async (email, password) => {
  const account = await User.findOne({ email: email });
  if (account && bcrypt.compareSync(password, account.password)) {
    return account;
  }
};

export const createUser = async (data) => {
  return await User.create(data);
};
