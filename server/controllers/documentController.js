import Document from "../models/Document.js";

// @desc Upload PDF Document
export const uploadDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const newDoc = new Document({
      user: req.user._id,
      filename: req.file.filename,
      originalname: req.file.originalname
    });

    await newDoc.save();

    res.status(201).json({
      message: "File uploaded successfully",
      document: newDoc
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
