import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  symbol: { type: String, unique: true, required: true, index: true },
  name: String,
  price: Number,
  dailyChange: { type: Number, default: 0 }, // Store daily price change %
}, { timestamps: true });

export const Stock = mongoose.model("Stock", StockSchema);
