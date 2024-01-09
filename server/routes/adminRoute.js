const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/register", adminController.addAdmin);
router.get('/dashboard', adminController.postDashboard);
router.get("/signin", adminController.loginAdmin);

module.exports = router;
