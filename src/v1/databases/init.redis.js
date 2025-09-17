const Redis = require("ioredis");

const logger = require("../utils/logger");

const [host, port] = (process.env.REDIS_URL || '' ).split(':');

const redis = new Redis({
  host: host,
  port: parseInt(port) || 6379,
  maxRetriesPerRequest: null, // Required for BullMQ
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
});

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
