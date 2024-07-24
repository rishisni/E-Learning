import mongoose from "mongoose";
import { User } from "../models/User.js"

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};


