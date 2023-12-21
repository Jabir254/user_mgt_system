const User = require("../models/User");

exports.userSign = async (res, req, next) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "password less than 6 characters" });
  }
  try {
    await User.create({
      username,
      password,
    }).then((user) => {
      res.status(200).json({
        message: "User successfully created",
        user,
      });
    });
  } catch (error) {
    res.status(401).json({
      message: "user not successful created",
    });
    console.log(error);
  }
};
