const User = require("../models/User");

exports.userSign = async (res, req, next) => {
  const username = req.body;
  const email = req.body;
  const password = req.body;
  if (password < 6) {
    return res.status(400).json({ message: "password less than 6 characters" });
  }
  try {
    await User.create({
      username,
      email,
      password,
    }).then((user) => {
      res.status(200).json({
        message: "User successfully created",
        user,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res, next) => {
  const { username, password } = req.body;
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
