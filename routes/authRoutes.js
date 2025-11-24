import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, 
      role: role || "student", });
    await user.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123", 
      { expiresIn: "1y" }
    );

    res.json({
      message: "✅ Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post("/", async (req, res) => {
  try {
    const { user, examId, score, total, percentage } = req.body;

    if (!user || !examId || score === undefined || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResult = new Result({
      user,
      examId,
      score,
      total,
      percentage,
    });

    await newResult.save();
    res.status(201).json({ message: "✅ Result saved successfully", newResult });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to save result", error: err.message });
  }
});

export default router;
