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

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * login in with the admin creditials
 */

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (email == email && password == password) {
    const token = jwt.sign({ password }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.render("admin/signin");
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
};
/**
 * render dashboard
 */
exports.postDashboard = async (req, res) => {
  const locals = {
    title: "user management system",
    description: "landing page",
  };
  res.render("admin/dashboard");
};
