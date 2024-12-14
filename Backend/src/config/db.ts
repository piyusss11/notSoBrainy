import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://piyusss11:IFHb8zpHCqeLP36B@cohot-3-practice.irm18.mongodb.net/brainly");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};