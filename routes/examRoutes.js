import express from "express";
import Exam from "../models/examModel.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.json(exams);
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({ error: err.message });
  }
});


router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, duration } = req.body;
    if (!title || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exam = await Exam.create({ title, duration });
    res.status(201).json(exam);
  } catch (err) {
    console.error("Error creating exam:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/admin/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
