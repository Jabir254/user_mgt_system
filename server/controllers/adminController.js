const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.Register = async function (req, res) {
  // get required variables from request body
  // using es6 object destructing
  const firstName = req.body;
  const lastName = req.body;
  const email = req.body;
  const password = req.body;
  try {
    // create an instance of a user
    const newUser = new Admin({
      firstName,
      lastName,
      email,
      password,
    });
    // Check if user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    const savedUser = await newUser.save(); // save new user into the database
    const { role, ...user_data } = savedUser._doc;
    res.status(200).json({
      status: "success",
      data: [user_data],
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
      });
    console.log(err);
  }
  res.end();
};
