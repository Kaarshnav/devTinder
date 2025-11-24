// schema for chai drinker user
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    minlength: 3,
  },
  lastName: { type: String },
  noOfTeaPerDay: {
    type: Number,
  },
});
// this model rename wwasted 1 hr
module.exports = mongoose.model("User", userSchema, "chaiDrinkers");
