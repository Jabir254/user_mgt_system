const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

exports.adminBro = new AdminBro({
  databases: [],
  rootPath: "/admin",
});

exports.router = AdminBroExpress.buildRouter(adminBro);
/**
 * Post
 * admin register
 */
