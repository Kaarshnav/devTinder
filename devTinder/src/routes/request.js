const express = require("express");
const requestRouter = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");
requestRouter.post("/sendConnectionRequest/:status", auth, async (req, res) => {
  // this is fr sending req and replying to recieved req ,when both are interested then only connection is made

  // we will reievemail id ( to whom user want to sent req)
  try {
    const user = await req.userData;
    const toMailId = req.body.email;
    const allowedStatus = ["Accepted", "Rejected", "Pending", "Ignored"];
    if (!allowedStatus.includes(req.params.status)) {
      throw new Error(" Status is not valid");
    }
    const toUser = await User.findOne({ email: toMailId });
    const isConnectionAvailable = await ConnectionRequestModel.findOne({
      toId: toUser._id,
      fromId: user._id,
      status: req.params.status,
    });
    if (isConnectionAvailable) {
      throw new Error(" already there is a req");
    }
    const connectionreq = new ConnectionRequestModel({
      toId: toUser._id,
      fromId: user._id,
      status: req.params.status,
    });

    await connectionreq.save();
    res.json({
      message: `Successfully sent request from ${user.firstName} to ${toUser.firstName}`,
    });
  } catch (err) {
    res.status(400).send(" Something went wrong " + err.message);
  }
});

module.exports = requestRouter;
