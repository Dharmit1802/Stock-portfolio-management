import redisClient from "../utils/cache.js";
import moment from "moment-timezone";
import { getBasicStockDetails, getBasicStockHistory } from "../services/stockDetails.js";

// get current stock price
export const getStockPrice = async (req, res) => {

  try {
    const { symbol } = req.params;

    // Check Redis cache first
    const cachedStock = await redisClient.get(symbol);
    if (cachedStock) {
      return res.json(JSON.parse(cachedStock));
    }

    const stock = await getBasicStockDetails(req, res, symbol)
    console.log(stock)
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const stockData = {
      symbol: stock.symbol,
      price: stock.price,
      dailyChange: stock.dailyChange, // Show percentage change
    };

    // Store in Redis cache for 10 minutes
    await redisClient.setEx(symbol, 600, JSON.stringify(stockData));

    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const stockHistory = async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const stock = await getBasicStockHistory(req, res, symbol);

    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const history = stock.history;

    // Format the history dates using moment
    const historyDate = history.map((item) => {
      return { ...item, date: moment(item.date).format("DD-MM-YYYY") };
    });

    res.json({ symbol: stock.symbol, name: stock.name, currentPrice: stock.price, history: historyDate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

