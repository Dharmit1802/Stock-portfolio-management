import mongoose from "mongoose";
import { Holding } from "../models/Holding.js";
import { Transaction } from "../models/Transaction.js";

export const addBuyTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { stockId, quantity, avgPrice } = req.body;

    let holding = await Holding.findOne({
      userId: req.user.id,
      stockId,
    }).session(session);

    if (!holding) {
      return res.json("You dont have stock");
    }

    const transaction = new Transaction({
      userId: req.user.id,
      stockId,
      type: "BUY",
      quantity: quantity,
      price: avgPrice,
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Stock bought successfully", transaction });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

export const addSellTransaction = async (req, res) => {
  try {
    const { stockId, quantity, price } = req.body;

    const holding = await Holding.findOne({ userId: req.user.id, stockId });

    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock to sell" });
    }

    holding.quantity -= quantity;

    // If quantity becomes 0, remove the holding
    if (holding.quantity === 0) {
      await holding.remove();
    } else {
      await holding.save(); // Save updated quantity
    }

    const transaction = new Transaction({
      userId: req.user.id,
      stockId,
      type: "SELL",
      quantity,
      price,
    });
    await transaction.save();

    res.json({ message: "Stock sold successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const transactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).populate({path:"stockId",select:"-history"});
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
