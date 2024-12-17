import mongoose, { mongo } from "mongoose";
import { IContent } from "../types/schema";

const contentTypes = [
  "image",
  "video",
  "article",
  "audio",
  "tweet",
  "youtube",
  "link",
];
const contentSchema = new mongoose.Schema<IContent>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  title: {
    type: String,
    required: true,
  },
  typeOfContent: {
    type: String,
    enum: contentTypes,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
const Content = mongoose.model<IContent>("Content", contentSchema);
export default Content;
