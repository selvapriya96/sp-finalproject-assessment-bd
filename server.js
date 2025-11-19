import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import resultRoutes from "./routes/resultRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();

// ✅ Connect MongoDB once
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);
// ✅ Root check route
app.get("/", (req, res) => res.send("API is running..."));

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
