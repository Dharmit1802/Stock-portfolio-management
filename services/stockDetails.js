import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

export const getBasicStockDetails = async (req, res, symbol) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
            params: {
                region: 'IN',
                symbols: `${symbol}.NS`
            },
            headers: {
                'x-rapidapi-key': `${process.env.RAPID_API_YAHOO}`,
                'x-rapidapi-host': `${process.env.RAPID_YAHOO_PATH}`
            }
        };

        const response = await axios.request(options);
        const stockData = response.data.quoteResponse.result;
        // console.log(stockData[0]);

        return {
            symbol,
            name: stockData[0].longName,
            price: stockData[0].regularMarketPrice,
            dailyChange: Number(stockData[0].regularMarketChangePercent.toFixed(2)),
        };

    } catch (error) {
        return res.status(401).json("Can't find the Stock! please enter a valid stock symbol")
    }
}


export const getBasicStockHistory = async (req, res, symbol) => {
    try {
        const options1 = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart',
            params: {
                interval: '1d',
                region: 'IN',
                symbol: `${symbol}.NS`,
                range: '5d',
                includePrePost: 'false',
                useYfid: 'true',
                includeAdjustedClose: 'true',
                events: 'capitalGain,div,split'
            },
            headers: {
                'x-rapidapi-key': `${process.env.RAPID_API_YAHOO}`,
                'x-rapidapi-host': `${process.env.RAPID_YAHOO_PATH}`
            }
        };
        let historicalData;

        const response = await axios.request(options1);

        const name = response.data.chart.result[0].meta.longName;

        const currentPrice = response.data.chart.result[0].meta.regularMarketPrice;

        const closeprice = response.data.chart.result[0].indicators.quote[0].close;

        const timeStamps = response.data.chart.result[0].timestamp;

        historicalData = timeStamps.map((timestamp, index) => ({
            date: new Date(timestamp * 1000), // Convert timestamp to YYYY-MM-DD
            price: closeprice[index].toFixed(2) // Get corresponding closing price
        }));

        return {
            symbol,
            name,
            price: currentPrice,
            history: historicalData.reverse()
        };
    } catch (error) {
        return res.status(401).json("Can't find the Stock! please enter a valid stock symbol")
    }
}