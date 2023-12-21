const express = require("express");
const router = express.Router();
const register = require("../controllers/userAuth");

router.post("/register", register.userSign);
router.post("/login", register.Login);

module.exports = router;
