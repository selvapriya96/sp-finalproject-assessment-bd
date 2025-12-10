import express from "express";
import Result from "../models/resultModel.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import { getResultById } from "../controllers/resultController.js";


const router = express.Router();


router.post("/", verifyToken, async (req, res) => {
  try {
    const { examId, score, total, percentage, answers } = req.body;

    if (!examId || score === undefined || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResult = await Result.create({
      userId: req.user._id,
      examId,
      score,
      total,
      percentage,
      answers,
    });

    res.status(201).json({
      message: "Result saved successfully",
      newResult,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/my-results", verifyToken, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user._id })
      .populate("examId", "title");

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/admin/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const results = await Result.find()
      .populate("userId", "name email")
      .populate("examId", "title");

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/review/:id", verifyToken, isAdmin, getResultById);

export default router;
