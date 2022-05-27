const mongoose = require("mongoose");
const debug = require("debug")("server:mongoose");
require("dotenv").config();

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, () => {
  debug(`connected to mongoose on ${connectionString}`);
});

module.exports = mongoose;
