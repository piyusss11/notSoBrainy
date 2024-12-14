import express from "express";
import { connectDB } from "./config/db";
import userRouter from "./routes/user";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
connectDB()
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
