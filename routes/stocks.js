import express from "express";
import { getStockPrice, stockHistory } from "../controllers/stockController.js";
const router = express.Router();

// Get current stock price with caching
router.get("/:symbol", getStockPrice);

router.get("/:symbol/history", stockHistory);

export default router;
