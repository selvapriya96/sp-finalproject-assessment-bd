import pkg from "joi";
const { date } = pkg;

import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // minutes
});

export default mongoose.model("Exam", examSchema);
