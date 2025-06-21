import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware for requests
app.use(morgan("dev"));

// Check and create uploads directory if not exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Uploads directory created");
}

// Test Route
app.get("/", (req, res) => {
  res.send("Document Signature App Backend is running");
});
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "MulterError") {
    // Multer-specific errors
    return res.status(400).json({ message: err.message });
  }
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Verify environment variables
if (!process.env.MONGO_URI) {
  console.warn("Warning: MONGO_URI is not set in environment variables");
}
if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is not set in environment variables");
}

// MongoDB Connection (Cleaned)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

export default app;
