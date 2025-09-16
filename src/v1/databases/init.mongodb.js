"use strict";
const mongoose = require("mongoose");

const logger = require("../utils/logger");
const { countConnect } = require("../helpers/check.connect");

const connectionString = process.env.MONGO_URI

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectionString)
      .then((_) => logger.info("MongoDB connected", countConnect()))
      .catch((err) => logger.error("Error Connect!"));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;