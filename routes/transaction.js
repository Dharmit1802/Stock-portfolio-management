import express from "express";
import auth from "../middleware/auth.js";
import {
  addBuyTransaction,
  addSellTransaction,
  transactionHistory,
} from "../controllers/transactionController.js";

const router = express.Router();

// Buy stock
router.post("/buy", auth, addBuyTransaction);

// Sell stock
router.post("/sell", auth, addSellTransaction);

// Retrieve transaction history
router.get("/history", auth, transactionHistory);

export default router;
