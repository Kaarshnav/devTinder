const express = require("express");
const auth = require("../middlewares/auth");
const userRouter = express.Router();
const connection = require("../models/connectionRequest");
const user = require("../models/user");
userRouter.get("/requestsRecieved", auth, async (req, res) => {
  try {
    const loggedInUser = req.userData;
    const allRequests = await connection
      .find({
        toId: loggedInUser._id,
        status: "Pending",
      })
      .populate("fromId", ["firstName", "lastName"]);
    res.json({ data: allRequests, message: " Data fetched succesfully" });
  } catch (err) {
    res.status(400).json({ message: "Somethig went wrong " + err.message });
  }
});
userRouter.get("/requestsAccepted", auth, async (req, res) => {
  try {
    const loggedInUser = req.userData;
    const allRequests = await connection
      .find({
        toId: loggedInUser._id,
        status: "Accepted",
      })
      .populate("fromId", ["firstName", "lastName"]);
    res.json({ data: allRequests, message: " Data fetched succesfully" });
  } catch (err) {
    res.status(400).json({ message: "Somethig went wrong " + err.message });
  }
});
userRouter.get("/feed", auth, async (req, res) => {
  try {
    /*** 
   * 
     don't show these prfile to user
        - his profile itsef,
        - already sent connection req (pending state)
        - already connection 
        - whom he has ignored 
     **/
    const loggedInUser = req.userData;
    const exludedprofile = await connection.find({
      $or: [{ toId: loggedInUser._id }, { fromId: loggedInUser._id }],
    });
    // adding our profile to set on directly
    const uniqueProfile = new Set([loggedInUser._id.toString()]);
    exludedprofile?.forEach((item) => {
      uniqueProfile.add(item.toId.toString());
      uniqueProfile.add(item.fromId.toString());
    });

    // const remainingProfiles = await user
    //   .find({
    //     $or: [
    //       { $nin: { _id: uniqueProfile } },
    //       { $ne: { _id: loggedInUser._id } },
    //     ],
    //   })
    //   .select("firstName");
    const uniqueProfileIdsArray = [...uniqueProfile];
    const remainingProfiles = await user
      .find({
        _id: { $nin: uniqueProfileIdsArray },
      })
      .select("firstName");
    // const remainingProfiles = await user.find({}).select("firstName");
    res.json({ data: remainingProfiles });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
