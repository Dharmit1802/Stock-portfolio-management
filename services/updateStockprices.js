import { Stock } from "../models/Stock.js";
import redisClient from "../utils/cache.js";
import { getBasicStockDetails } from "./stockDetails.js";

// Function to update stock prices
const updateStockPrices = async (req, res) => {
  try {
    const stocks = await Stock.find(); // Get all stocks

    for (const stock of stocks) {
      const stockData = await getBasicStockDetails(req, res, stock.symbol);
      if (!stockData) continue;

      const newPrice = stockData.price;
      // console.log(stockData.history[0].price)


      await Stock.findByIdAndUpdate(stock._id, {
        $set: { ...stockData },
      });

      await redisClient.setEx(
        stock.symbol,
        600,
        JSON.stringify({ symbol: stock.symbol, price: newPrice, dailyChange: stock.dailyChange })
      );

      console.log(
        `Updated ${stock.symbol
        }: Price = ${newPrice}, Change = ${stock.dailyChange}%`
      );
    }
  } catch (error) {
    console.error("Error updating stock prices:", error.message);
  }
};

// Schedule stock price updates every hour
setInterval(updateStockPrices, 7200000);

// Run an immediate update on startup
updateStockPrices();

export default updateStockPrices;
