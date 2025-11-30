const connectDB = require("./config/database");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const cookiesParser = require("cookie-parser");

dotenv.config();
const auth = require("./middlewares/auth");
const app = express();
const port = process.env.PORT;
const User = require("./models/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

//
const allowedOrigins = [
  "http://localhost:5173",
  "https://myFutureFeHosted.com",
];

app.use(
  cors({
    origin: allowedOrigins, // direct whitelist array
    credentials: true, // needed for cookies
  })
);
//
app.use(express.json()); // so that we can read req.body
app.use(cookiesParser()); // so that we can read from cookies stored in client
//

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);
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
