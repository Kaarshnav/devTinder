const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decrpytUserId = await jwt.verify(token, process.env.JWT_SINGLE_KEY);
    const userData = await User.findById({ _id: decrpytUserId._id });
    if (userData) {
      req.userData = userData;
      next();
    } else {
      throw new Error(" Not authenticated");
    }
  } catch (err) {
    res.status(400).send("User Not authenticated ..." + err.message);
  }
};
module.exports = auth;
