import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: { 
type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  givenAnswer: mongoose.Schema.Types.Mixed,
  isCorrect: Boolean,
  marksAwarded: Number,
});

const ResultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [AnswerSchema],
  score: Number,
  totalMarks: Number,
  percentage: Number,
  durationTakenSec: Number,
  proctoringFlags: [{ timeSec: Number, reason: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Result", ResultSchema);
