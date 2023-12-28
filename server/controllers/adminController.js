const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/**
 * create a new admin
 * @param {new Admin} req
 * @param {body} res
 */
exports.addAdmin = async (req, res) => {
  console.log(req.body);

  const newAdmin = new Admin({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await Admin.create(newAdmin);
    await req.flash("info", "New admin has been added");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * login in with the admin creditials
 */

exports.loginAdmin = async (req, res) => {
  const { userName, password } = req.body;
  if (userName == userName && password == password) {
    const token = jwt.sign({ userName }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.redirect('/dashboard');
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
};
