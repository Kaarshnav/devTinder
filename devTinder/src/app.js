const connectDB = require("./config/database");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;
const User = require("./models/user");
app.use(express.json());
// app.use("/", (req, res) => {
//   console.log(" at / path ");
//   res.send(" --hello from use of expreess -");
// });

app.post("/signup", async (req, res) => {
  try {
    // gettig data from query params
    // console.log(req.query);
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
    const userFromBody = User(req.body);
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
