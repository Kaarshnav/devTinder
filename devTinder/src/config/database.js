const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://valyrianjs_db_user:sOOViP70DOGfJtTM@ekcupchaihojaedb.0fvljk0.mongodb.net/?appName=ekCupChaiHoJaeDb"
  );
};
module.exports = connectDB;
