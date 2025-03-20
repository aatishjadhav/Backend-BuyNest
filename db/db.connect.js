const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB;

const initializeDb = async () => {
  await mongoose
    .connect(MongoUri)
    .then(() => {
      console.log("Connected to Mongodb successfully.");
    })
    .catch((error) => {
      console.log("Error while connecting to database.", error);
    });
};

module.exports = { initializeDb };
