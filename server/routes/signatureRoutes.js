import express from "express";
import { createSignature, deleteSignature, getSignatureById, getSignatures, updateSignature } from "../controllers/signatureController.js";

const router = express.Router();

router.get("/", getSignatures);
router.post("/", createSignature);
router.get("/:id", getSignatureById);
router.put("/:id", updateSignature);
router.delete("/:id", deleteSignature);

export default router;
