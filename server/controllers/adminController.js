const Admin = require('../models/Admin');
const mongoose = require('mongoose');

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
    password: req.body.password
  });

  try {
    await Admin.create(newAdmin);
    await req.flash("info", "New admin has been added");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
