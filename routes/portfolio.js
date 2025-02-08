import express from "express";
import auth from "../middleware/auth.js";
import {
  addStockToPortfolio,
  getPortfolioValue,
  removeStockFromPortfolio,
  userHoldings,
} from "../controllers/portfolioController.js";

const router = express.Router();

// Add stock to portfolio
router.post("/add", auth, addStockToPortfolio);

// Remove stock from portfolio
router.delete("/remove/:stockId", auth, removeStockFromPortfolio);

// Get portfolio value
router.get("/value", auth, getPortfolioValue);

// List all holdings
router.get("/holdings", auth, userHoldings);

export default router;
