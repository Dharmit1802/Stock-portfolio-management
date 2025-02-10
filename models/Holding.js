import mongoose from "mongoose";

const HoldingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", index: true },
  quantity: Number,
  avgPrice: Number,
}, { timestamps: true });

export const Holding = mongoose.model("Holding", HoldingSchema);
