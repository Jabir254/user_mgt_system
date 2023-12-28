const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/register", adminController.addAdmin);
router.get("/login", adminController.loginAdmin);

module.exports = router;
