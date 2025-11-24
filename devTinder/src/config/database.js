const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  // adding db name at the end , coz it is not in connection string
  await mongoose.connect(process.env.MONGO_URI);
};
module.exports = connectDB;
