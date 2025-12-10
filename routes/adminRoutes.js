import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import Result from "../models/resultModel.js";
import User from "../models/userModel.js";
import Exam from "../models/examModel.js";

const router = express.Router();


router.get("/students", verifyToken, isAdmin, async (req, res) => {
  const students = await User.find({ role: "student" });
  res.json(students);
});

router.get("/exams", verifyToken, isAdmin, async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
});

router.get("/results", verifyToken, isAdmin, async (req, res) => {
  const results = await Result.find()
    .populate("userId", "name email")
    .populate("examId", "title");
  res.json(results);
});

export default router;
