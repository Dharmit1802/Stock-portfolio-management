import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import portfolio from "./routes/portfolio.js";
import transaction from "./routes/transaction.js";
import stocks from "./routes/stocks.js";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import updateStockPrices from "./services/updateStockprices.js";
// import updateStockPrices from "./utils/updateStockprices.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", auth);
app.use("/api/portfolio", portfolio);
app.use("/api/transactions", transaction);
app.use("/api/stocks", stocks);

updateStockPrices();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
