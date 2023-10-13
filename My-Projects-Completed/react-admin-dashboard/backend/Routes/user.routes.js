const express = require("express");
const { UserModel } = require("../MVC/models/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send(err.message);
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.send(`new user created successfully-> ${user}`);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, isPasswordMatched) => {
        if (isPasswordMatched) {
          let token = jwt.sign(
            { userID: user._id, userName: user.name },
            "masai"
          );
          res.status(200).json({message:`logged in successfully`, token: token});
        } else {
          res.send(`password mismatch`);
        }
      });
    } else {
      res.send(`user not found`);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  userRouter,
};
