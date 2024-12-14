import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { validateUserRegistration } from "../utils/zod";
import { User } from "../models/User";
import { z } from "zod";
const userRouter = Router();

userRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validationData = validateUserRegistration(req.body);
      const { firstName, email, password, userName } = validationData;
      const existingUser = await User.find({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        firstName,
        email,
        userName,
        password: hashedPassword,
      });
      res.status(200).json({ message: "User created", user });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        res.status(500).json({ message: "error creating user" });
      }
    }
  }
);

export default userRouter