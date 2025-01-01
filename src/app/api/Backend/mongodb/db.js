import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_DB_URL || process.env.MONGO_DB_URL;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Failed to connect to the database");
    }
  }
}
