// schema for chai drinker user
const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 15,
      trim: true,
    },
    lastName: { type: String, trim: true },
    noOfTeaPerDay: {
      type: Number,
      maxLength: 10,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: (email) => {
        return validator.isEmail(email);
      },
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// this model rename wasted 1 hr so make sure the db name is matching at third arg
module.exports = mongoose.model("User", userSchema, "chaiDrinkers");
