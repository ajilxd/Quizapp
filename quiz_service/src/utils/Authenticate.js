import { checkToken } from "../service/quizService.js";
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    console.log(token);
    const user = await checkToken(token);
    console.log("nooo errror @ authenticate token");
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default authenticateToken;
