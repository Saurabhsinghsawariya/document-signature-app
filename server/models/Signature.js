import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Document",
  },
  signatureData: {
    type: String,
    required: true,
  },
  signedAt: {
    type: Date,
    default: Date.now,
  },
});

const Signature = mongoose.model("Signature", signatureSchema);

export default Signature;
