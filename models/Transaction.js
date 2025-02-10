import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
  type: { type: String, enum: ["BUY", "SELL"] },
  quantity: Number,
  price: Number,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", TransactionSchema);
