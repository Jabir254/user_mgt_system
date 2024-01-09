const express = require("express");
const router = express.Router();
const Register = require("../controllers/adminController");
const Validate = require("../middleware/validate");
router.post("/register", Validate, adminController.addAdmin);
router.post("/dashboard", adminController.postDashboard);
router.get("/signin", adminController.loginAdmin);

module.exports = router;
