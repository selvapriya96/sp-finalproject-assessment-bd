import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  givenAnswer: mongoose.Schema.Types.Mixed,
  isCorrect: Boolean,
  marksAwarded: Number,
});

const resultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [AnswerSchema],
  score: Number,
  totalMarks: Number,
  percentage: Number,
  durationTakenSec: Number,
  proctoringFlags: [{ timeSec: Number, reason: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Result || mongoose.model("Result", resultSchema);
