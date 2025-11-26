const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error(" please add valid email id ");
    }
    const userFromDb = await User.findOne({ email });
    if (!userFromDb) throw new Error(" user not found with that mail id  ");
    const isCoorectPass = await bcrypt.compare(password, userFromDb.password);
    if (isCoorectPass) {
      // cookies settig part will be doen after authentication
      // expiresIn works with objet apytloiad only , so had to convert to obj from string
      const token = await jwt.sign(
        {
          _id: userFromDb._id.toString(),
        },
        process.env.JWT_SINGLE_KEY,
        {
          expiresIn: "7d",
        }
      ); // by deafult algo is HS256

      res.cookie("token", token, {
        expires: new Date(Date.now() + 9000000000),
        httpOnly: true, // to prevenyt xss
        sameSite: "strict",
        secure: true,
      });

      //
      res.send(" User suggeesfully loggedin");
    } else {
      throw new Error(" incoreect pass ");
    }
  } catch (err) {
    res.status(404).send(" Invalid creds " + err.message);
  }
});
authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10); // 10 round of encrpt

    const userFromBody = User({
      firstName,
      lastName,
      email,
      password: hashPass,
    });

    await userFromBody.save();

    res.send(" user addded succesfully ");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = authRouter;
