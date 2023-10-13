const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.routes");
const { urlRouter } = require("./Routes/url.routes");
const cors = require("cors");

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Navigation
app.use("/users", userRouter);
app.use("/url", urlRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(8000, async (req, res) => {
  try {
    await connection;
    console.log("connection established successfully");
  } catch (error) {
    console.log(error.message);
  }
});
