import Signature from "../models/Signature.js";

// Get all signatures
export const getSignatures = async (req, res) => {
  try {
    const signatures = await Signature.find();
    res.json(signatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get signature by ID
export const getSignatureById = async (req, res) => {
  try {
    const signature = await Signature.findById(req.params.id);
    if (!signature) {
      return res.status(404).json({ message: "Signature not found" });
    }
    res.json(signature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new signature
export const createSignature = async (req, res) => {
  const signature = new Signature(req.body);
  try {
    const newSignature = await signature.save();
    res.status(201).json(newSignature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a signature
export const updateSignature = async (req, res) => {
  try {
    const updatedSignature = await Signature.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSignature) {
      return res.status(404).json({ message: "Signature not found" });
    }
    res.json(updatedSignature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a signature
export const deleteSignature = async (req, res) => {
  try {
    const deletedSignature = await Signature.findByIdAndDelete(req.params.id);
    if (!deletedSignature) {
      return res.status(404).json({ message: "Signature not found" });
    }
    res.json({ message: "Signature deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
