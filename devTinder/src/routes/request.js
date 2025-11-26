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
requestRouter.patch(
  "/reviewConnectionRequest/:status/:id",
  auth,
  async (req, res) => {
    // user will review the recieved  connenction request , so allowed ststus will be rejected accepted , not ignore,
    //  coz that is while sending req, asume in likes section of tinder
    // getting user from userId via query params ,not from body( just to check that apth as well )

    // validation for status and userId
    try {
      const allowedStatus = ["Accepted", "Rejected"];
      if (!allowedStatus.includes(req.params.status)) {
        throw new Error(" Status is not valid");
      }
      // toId is always from userData.id i.e logged in user can only his data
      const loggedInUser = req.userData;
      const connectionUser = await ConnectionRequestModel.findOne({
        fromId: req.params.id,
        toId: loggedInUser._id,
      });
      console.log("first", loggedInUser._id, req.params.id, connectionUser);
      if (!connectionUser) {
        throw new Error(" connection to that user doesn't exist");
      }
      await connectionUser.updateOne({
        fromId: req.params.id,
        toId: loggedInUser._id,
        status: req.params.status,
      });
      res.json({
        message: ` status updated for connection from ${req.params.id} to ${loggedInUser._id} as  ${req.params.status} by ${loggedInUser.firstName}`,
      });
    } catch (err) {
      res.status(400).json({ message: "smething went wrong " + err.message });
    }
  }
);

module.exports = requestRouter;
