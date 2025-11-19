import express from "express";
import Result from "../models/resultModel.js";

const router = express.Router();

// ➕ Save Exam Result
router.post("/", async (req, res) => {
  try {
    const { user, examId, score, total, percentage } = req.body;
    const newResult = new Result({ user, examId, score, total, percentage });
    await newResult.save();
    res.status(201).json({ message: "Result saved successfully", result: newResult });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📋 Get Results by User
router.get("/:user", async (req, res) => {
  try {
    const results = await Result.find({ user: req.params.user }).populate("examId");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
