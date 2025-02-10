import { Holding } from "../models/Holding.js";
import { Stock } from "../models/Stock.js";
import { storeStock } from "../services/storeStock.js";

// add to portfolio
export const addStockToPortfolio = async (req, res) => {
  try {
    const { stockSymbol, quantity, avgPrice } = req.body;
    console.log(quantity, typeof (quantity));
    // Check if stock already exists in the database
    let stock = await Stock.findOne({ symbol: stockSymbol });

    // If stock is missing, fetch it from an external API and save it
    if (!stock) {
      stock = await storeStock(req, res, stockSymbol);
    }

    // Check if the user already has this stock in their portfolio
    let holding = await Holding.findOne({
      userId: req.user.id,
      stockId: stock._id,
    });

    if (holding) {
      // Update existing stock holding

      holding.avgPrice =
        (holding.avgPrice * holding.quantity + avgPrice * quantity) /
        (holding.quantity + Number(quantity));

      holding.quantity += Number(quantity);
      await holding.save();
    } else {
      // Create a new stock holding
      holding = new Holding({
        userId: req.user.id,
        stockId: stock._id,
        quantity,
        avgPrice,
      });
      await holding.save();
    }

    res.json({ message: "Stock added to portfolio", holding });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// remove from portfolio
export const removeStockFromPortfolio = async (req, res) => {
  try {
    const { stockId } = req.params;
    const stock = await Holding.findOneAndDelete({ userId: req.user.id, stockId });
    if (!stock) {
      res.status(500).json("already removed or stock doesn't in your holding")
    }
    res.status(200).json({ message: "Stock removed from portfolio" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get portfolio value
export const getPortfolioValue = async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.user.id }).populate("stockId");

    console.log(holdings)

    if (holdings.length === 0) return res.status(401).json("Holding is empty")

    let totalValue = 0;
    let holdingValue = 0;
    let totalGainLoss = 0; // Variable to track overall gain or loss

    const StocksPerformance = holdings.map((item) => {
      const gainLoss = item.quantity * item.stockId.price - item.quantity * item.avgPrice;
      totalGainLoss += gainLoss; // Accumulate the gain/loss

      return {
        stock: item.stockId.symbol,
        Status: gainLoss > 0 ? `Gain ${gainLoss.toFixed(2)}` : gainLoss < 0 ? `Loss ${gainLoss.toFixed(2)}` : "No Change",
        currentPrice: item.stockId.price,
        holdingPrice: Number(item.avgPrice.toFixed(2))
      };
    });

    holdings.forEach((holding) => {
      totalValue += holding.quantity * holding.stockId.price;
      holdingValue += holding.quantity * holding.avgPrice;
    });

    res.json({
      totalValue: Number(totalValue.toFixed(2)),
      totalHolding: holdingValue,
      Overall: totalGainLoss > 0 ? `Gain ${totalGainLoss.toFixed(2)}` : totalGainLoss < 0 ? `Loss ${totalGainLoss.toFixed(2)}` : "No Overall Change",
      StocksPerformance
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// list all holdings
export const userHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.user.id }).populate(
      "stockId"
    );
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
