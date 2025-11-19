import express from "express";
import Exam from "../models/examModel.js";

const router = express.Router();

// ✅ Create exam
router.post("/", async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update exam
router.put("/:id", async (req, res) => {
  try {
    const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Exam updated", updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete exam
router.delete("/:id", async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
