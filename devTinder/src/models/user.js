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
// this model rename wasted 1 hr so make sure the db name is matching at third arg
module.exports = mongoose.model("User", userSchema, "chaiDrinkers");
