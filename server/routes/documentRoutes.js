import express from "express";
import { uploadDocument } from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// This MUST exist
router.post("/upload", protect, upload.single("file"), uploadDocument);

export default router;
