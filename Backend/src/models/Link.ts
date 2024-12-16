import mongoose from "mongoose";
import { ILink } from "../types/schema";

const linkSchema = new mongoose.Schema<ILink>({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Link = mongoose.model<ILink>("Link", linkSchema);
export default Link;
