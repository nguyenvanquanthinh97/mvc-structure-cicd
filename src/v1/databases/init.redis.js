const Redis = require("ioredis");

const logger = require("../utils/logger");

const redis = new Redis(process.env.REDIS_URI);
redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("ready", () => {
  logger.info("Redis connection is ready to use");
});

redis.on("error", (err) => {
  logger.error("Redis connection error", err);
});

module.exports = redis;
