import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const dbConnect = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("can't connect to mongodb", err);
      process.exit(1);
    });
};
