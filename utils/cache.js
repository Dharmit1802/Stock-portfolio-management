import redis from "redis";
import dotenv from "dotenv";
dotenv.config();
const redisClient = redis.createClient({ url: process.env.REDIS_URL });

redisClient
  .connect()
  .then(() => console.log("Redis Connected"))
  .catch((err) => console.error("Redis Error", err));

export default redisClient;
