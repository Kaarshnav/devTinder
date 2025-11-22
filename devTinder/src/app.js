const express = require("express");
const app = express();
const port = 8081;

app.use("/", (req, res) => {
  console.log(" at / path ");
  res.send(" --hello from use of expreess -");
});

app.get("/user", (req, res) => {
  res.send(" hello to user from get of /user ");
});

app.listen(port, () => {
  console.log(`Express is listining you bahi at ${port} ...... `);
});
