import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import examRoutes from "./routes/examRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";



dotenv.config();
const app = express();

app.use(express.json({ limit: "5mb" }));


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://sp-finalproject-assessment.netlify.app",
  "https://sp-finalproject-assessment-bd.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS policy: Origin not allowed"), false);
      }
    },
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully");
});


app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});


app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admin", adminRoutes);


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});


const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connect error", err);
  });
