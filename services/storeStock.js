import { Stock } from "../models/Stock.js";
import { getBasicStockDetails } from "./stockDetails.js";

export const storeStock = async (req, res, symbol) => {
    let stock = await getBasicStockDetails(req, res, symbol);

    if (!stock) {
        return res.status(400).json({ message: "Invalid Stock" });
    }
    console.log(stock.history);
    stock = new Stock({ ...stock });
    await stock.save();
    return stock;
}