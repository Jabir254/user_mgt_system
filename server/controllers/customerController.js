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
    description: " User Management System",
  };
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.countDocuments();
    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {GEt} req
 * @param {*about} res
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "User Management System",
  };

  try {
    res.render("about", locals);
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

/**
 * Get /
 * customer Data
 */

exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get
 * edit customer data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "Edit Customer details",
      description: "User Managament system",
    };
    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Put
 * edit a customer data
 */
exports.postEdit = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete
 * delete a customer from the list
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get
 * search a customer
 */

exports.searchCustomer = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
