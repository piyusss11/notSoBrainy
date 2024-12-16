import express from "express";
import { connectDB } from "./config/db";
import userRouter from "./routes/user";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/v1/user", userRouter);
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
