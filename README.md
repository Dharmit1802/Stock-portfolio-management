# 📈 Stock Portfolio Management System

A backend system for tracking stock portfolios, fetching stock prices from Upstox API, and managing user transactions.

---

## 🚀 Features
- ✅ User authentication (JWT-based)
- ✅ Stock portfolio management (add, remove, list holdings)
- ✅ Transaction tracking (buy/sell stocks)
- ✅ Fetch live stock prices from Upstox API
- ✅ Caching with Redis for performance
- ✅ Periodic stock price updates
- ✅ Concurrent request handling

---

## 🛠 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/stock-portfolio-management.git
cd stock-portfolio-management
```
### **2️⃣ Install Dependencies**
```sh
npm install
```
### **3️⃣ Setup Environment Variables**
Create a .env file in the root directory and add the following:
```sh
PORT=5000

# **MongoDB Database**
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/stock_db

# JWT Authentication Secret
JWT_SECRET=your_secret_key

# Redis Cache (for performance)
REDIS_URL=redis://127.0.0.1:6379

# Rapid API Credentials
RAPID_API_YAHOO=your_rapid_api_key
RAPID_YAHOO_PATH=your_yahoo_api_path
```

### **4️⃣ Start the Server**
```sh
npm start
```
or with Nodemon (recommended for development):

```sh
npx nodemon server.js
```
---

## 📡 API Endpoints
🔹 Authentication

| Method | Endpoint | Description |
| ------------- | ------------- | ------------- |
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and get JWT token |

🔹 Portfolio Management

| Method | Endpoint | Description |
| ------------- | ------------- | ------------- |
| POST | /portfolio/add | Add stock to portfolio (auto-fetch stock if missing) |
| DELETE | /portfolio/remove/:stockId | Remove stock from portfolio |
| GET | /portfolio/value | Get total portfolio value |
| GET | /portfolio/holdings | List all holdings |

🔹 Transactions

| Method | Endpoint | Description |
| ------------- | ------------- | ------------- |
| POST | /transactions/buy | Buy stock |
| POST | /transactions/sell | Sell stock |
| GET | /transactions/history | Retrieve transaction history |

🔹 Stock Data

| Method | Endpoint | Description |
| ------------- | ------------- | ------------- |
| GET | /stocks/:symbol | Get current stock price |
| GET | /stocks/:symbol/history | Get stock price history |

---

## 🔧 Development Setup

1️⃣ Database Configuration (MongoDB)
 - Ensure you have a MongoDB URI in .env.
 - You can use MongoDB Atlas (Cloud) or Local MongoDB.
   
2️⃣ Handling Concurrent Requests
 - Uses MongoDB Transactions to prevent race conditions.
 - Uses Redis Caching for stock price requests.

--- 

## 💾 Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ORM)
- Authentication: JWT (JSON Web Tokens)
- Stock API: Upstox API
- Caching: Redis
- Concurrency Handling: MongoDB Transactions

---

## 📜 License

This project is licensed under the MIT License.


