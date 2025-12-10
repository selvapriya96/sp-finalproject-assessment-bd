import express from "express";
import Question from "../models/questionModel.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ message: "Question added", question });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.get("/:examId", async (req, res) => {
  try {
   const examId = mongoose.Types.ObjectId(req.params.examId);
    const questions = await Question.find({ examId });
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this exam" });
    }
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
