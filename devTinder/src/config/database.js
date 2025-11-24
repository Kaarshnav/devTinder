const mongoose = require("mongoose");
const connectDB = async () => {
  // adding db name at the end , coz it is not in connection string
  await mongoose.connect(
    "mongodb+srv://valyrianjs_db_user:sOOViP70DOGfJtTM@ekcupchaihojaedb.0fvljk0.mongodb.net/helloWorldData"
  );
};
module.exports = connectDB;
