import { checkUser, createToken, createUser } from "../service/userService.js";
import catchAsync from "../utils/catchAsyc.js";

export const loginUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await checkUser(email, password);
  console.log(user);
  if (user) {
    const token = await createToken(user);
    console.log("hiii");
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json("unauthorized");
  }
});

export const registerUser = catchAsync(async function (req, res, next) {
  const data = req.body;
  const result = await createUser(data);

  res.status(200).json(result);
});

export const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "Strict",
    expires: new Date(0),
  });
  res.status(200).json("logout went succesfull");
});
