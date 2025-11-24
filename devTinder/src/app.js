const connectDB = require("./config/database");
const express = require("express");
const app = express();
const port = 8081;

// app.use("/", (req, res) => {
//   console.log(" at / path ");
//   res.send(" --hello from use of expreess -");
// });
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
