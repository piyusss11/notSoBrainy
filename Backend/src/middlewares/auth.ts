import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";

export async function UserAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.token as string;
  try {
    if (!token) {
      res.status(401).json({ message: "Unauthorized as user" });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({ message: "Invalid user, please login again" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Error authenticating the user", error: error });
  }
}
