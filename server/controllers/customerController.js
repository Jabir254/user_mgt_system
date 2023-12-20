const Customer = require("../models/customer");
const mongoose = require("mongoose");
/**
 * Get /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const messages = await req.flash("info");
  const locals = {
    title: "NodeJs",
  };

  try {
    const customers = await Customer.find({}).limit(22);
    res.render("index", { locals, messages, customers });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get
 * New Customer
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add new Customer",
  };
  res.render("customer/add", locals);
};

/**
 * Post
 * New customer Form
 */
exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New Customer has been added");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
