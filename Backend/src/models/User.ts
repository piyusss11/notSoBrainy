import mongoose, { Model } from "mongoose";
import { IUser } from "../types/schema";

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 10,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxlength:20,
    required: true,
  },
});

export const User: Model<IUser> = mongoose.model("User", userSchema);
