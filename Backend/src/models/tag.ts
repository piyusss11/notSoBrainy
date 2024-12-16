import mongoose from "mongoose";
import { ITags } from "../types/schema";

const tagSchema = new mongoose.Schema<ITags>({
  title: {
    type: String,
    required: true,
  },
});

const Tag = mongoose.model<ITags>("Tag", tagSchema);
export default Tag;
