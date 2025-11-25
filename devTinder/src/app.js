const connectDB = require("./config/database");
const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const validator = require("validator");
dotenv.config();

const app = express();
const port = process.env.PORT;
const User = require("./models/user");

app.use(express.json());
// app.use("/", (req, res) => {
//   console.log(" at / path ");
//   res.send(" --hello from use of expreess -");
// });

app.get("/getUser", async (req, res) => {
  try {
    const emailId = req.body.email;
    const users = await User.find({ email: emailId });
    if (users.length === 0) res.send(404).send("user not found");
    else {
      res.send(users);
    }
  } catch (err) {
    res.send(400).send("something went wrong");
  }
});
app.get("/getAllUser", async (req, res) => {
  try {
    const emailId = req.body.email;
    const users = await User.find({});
    if (users.length === 0) res.send(404).send("user not found");
    else {
      res.send(users);
    }
  } catch (err) {
    res.send(400).send("something went wrong");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(validator.isEmail(email), " -- res---");
    if (!validator.isEmail(email)) {
      throw new Error(" please add valid email id ");
    }
    const userFromDb = await User.findOne({ email });
    if (!userFromDb) throw new Error(" user not found with that mail id  ");
    const isCoorectPass = await bcrypt.compare(password, userFromDb.password);
    if (isCoorectPass) res.send(" User suggeesfully loggedin");
    else {
      throw new Error(" incoreect pass ");
    }
  } catch (err) {
    res.status(404).send(" Invalid creds " + err.message);
  }
});
app.post("/signup", async (req, res) => {
  try {
    // gettig data from query params
    // console.log(req.query);

    //only gettin. what's required
    const { firstName, lastName, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10); // 10 round of encrpt
    console.log(" passed pass ---", password, "-- hash pass ---", hashPass);
    console.log(req.body);
    // creating user from that
    // const firstUser = new User({
    //   firstName: "sumit 2 ",
    //   lastName: "yadav",
    //   noOfTeaPerDay: 2,
    // });
    // console.log(req.query);
    // 127.0.0.1:8081/signup?firstName=ram&lastName=ji

    // const dummyUser = new User({
    //   firstName: req.query.firstName,
    //   lastName: req.query.lastName,
    // });
    const userFromBody = User({
      firstName,
      lastName,
      email,
      password: hashPass,
    });
    // saving data to db
    // await mongodb.create(firstUser);
    // await firstUser.save();
    // await dummyUser.save();
    await userFromBody.save();

    // console.log(firstUser);
    res.send(" user addded succesfully ");
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});
app.get(
  "/multipleHandler",
  (req, res, next) => {
    console.log(" res 1 ");
    // res.send("res 1");
    next();
  },
  (req, res) => {
    console.log(" res 2 ");
    // res.send("res 2");
  }
);
// query
app.get("/chai", (req, res) => {
  console.log(req?.query, "--query ---");
  res.send(`you send this in quer param ${req?.query?.q}`);
});
// params
app.get("/chai/:id", (req, res) => {
  console.log(req.params.id, "--query ---");
  res.send(`you send this in quer param ${req.params.id}`);
});
app.get("/user", (req, res) => {
  res.send(" hello to user from get of /user ");
});
app.post("/user", (req, res) => {
  res.send(" hello to user from post of /user ");
});
app.get("/user", (req, res) => {
  res.send(" hello to user from get of /user ");
});
connectDB()
  .then(() => {
    console.log(" db connected succesfully");
    app.listen(port, () => {
      console.log(`Express is listining you bahi at ${port} ...... `);
    });
  })
  .catch((err) => {
    console.log(" some error occured", err.message);
  });
