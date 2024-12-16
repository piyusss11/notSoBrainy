import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { validateUserLogin, validateUserRegistration } from "../utils/zod";
import { User } from "../models/User";
import { IUser } from "../types/schema";
import { UserAuth } from "../middlewares/auth";
const userRouter = Router();

userRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validationData = validateUserRegistration(req.body);
      const { firstName, email, password, userName } = validationData;
      console.log(validationData);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      console.log("user is not there");

      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        firstName,
        email,
        userName,
        password: hashedPassword,
      });
      console.log(user);

      console.log("user created");

      res.status(200).json({ message: "User created", user });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        res.status(500).json({ message: "error creating user", error: err });
      }
    }
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validationData = validateUserLogin(req.body);
      const { password, userName } = validationData;
      const getUser = await User.findOne({ userName });
      if (!getUser) {
        res.status(400).json({ message: "Invalid Credentials" });
        return;
      }
      const user = getUser as IUser;
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Invalid Credentials" });
        return;
      }
      const token = jwt.sign(
        { id: user?._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      res.status(200).json({ message: "login user succesfully", token });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        res.status(500).json({ message: "error loging in user" });
      }
    }
  }
);

userRouter.get("/test", UserAuth, (req: Request, res: Response) => {
  const user = req.user;
  try {
    res.status(200).json({ message: "user done", user });
  } catch (err) {
    res.status(500).json({ message: "cant get user" });
  }
});
export default userRouter;
