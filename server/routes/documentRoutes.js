import express from "express";
import { getUserDocuments, uploadDocument } from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// Get all documents for the logged-in user
router.get("/", protect, getUserDocuments);
// This MUST exist

router.post("/upload", protect, upload.single("file"), uploadDocument);

export default router;
