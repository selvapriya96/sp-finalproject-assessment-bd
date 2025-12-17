import mongoose from "mongoose";
import Question from "../models/questionModel.js";

// GET questions by examId
export const getQuestionsByExamId = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    const questions = await Question.find({
      examId: new mongoose.Types.ObjectId(examId),
    });

    return res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({
      message: "Server error while fetching questions",
    });
  }
};

// ADD question
export const addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();

    res.status(201).json({
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
