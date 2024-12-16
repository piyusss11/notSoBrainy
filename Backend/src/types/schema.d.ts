import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  userName: string;
  email: string;
  password: string;
}
export interface ILoginUser {
  userName: string;
  password: string;
}

export interface IContent extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  typeOfContent: string;
  link: string;
  title: string;
}
export interface ITags extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
}

export interface ILink extends Document {
  _id: mongoose.Types.ObjectId;
  hash: string;
  userId: mongoose.Types.ObjectId;
}
