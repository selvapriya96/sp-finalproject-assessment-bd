// fixQuestions.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/questionModel.js"; // adjust path if needed
import Exam from "./models/examModel.js"; // adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const fixQuestions = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    const examMap = {
      "64f0a123abc4567890def123": "690455ff7d83f7f8eb79df1a",
      // add more old->correct IDs here
    };

    for (const [oldId, newId] of Object.entries(examMap)) {
      const res = await Question.updateMany(
        { examId: new mongoose.Types.ObjectId(oldId) },
        { $set: { examId: new mongoose.Types.ObjectId(newId) } }
      );
      console.log(`Updated examId ${oldId} → ${newId}:`, res);
    }

    console.log("All questions fixed successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error fixing questions:", err);
    mongoose.connection.close();
  }
};

fixQuestions();
