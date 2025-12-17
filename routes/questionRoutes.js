// routes/questionRoutes.js
import express from "express";
import mongoose from "mongoose";
import Question from "../models/questionModel.js";

const router = express.Router();

/**
 * GET questions by examId
 */
router.get("/:examId", async (req, res) => {
  try {
    const { examId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    const questions = await Question.find({ examId });

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error while fetching questions" });
  }
});

/**
 * ADD question
 */
router.post("/", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
