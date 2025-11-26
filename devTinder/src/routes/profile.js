const express = require("express");
const profileRouter = express.Router();
const auth = require("../middlewares/auth");

profileRouter.get("/getProfileAfterLogin", auth, async (req, res) => {
  try {
    res.send(req.userData);
  } catch (err) {
    res.status(400).send(" Something went wrong" + err.message);
  }
});

profileRouter.get("/getAllUser", auth, async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) res.send(404).send("user not found");
    else {
      res.send(users);
    }
  } catch (err) {
    res.send(400).send("something went wrong");
  }
});
module.exports = profileRouter;
