const express = require("express");
const router = express.Router();
const register = require("../controllers/userAuth");

router.post("/register", register.userSign);

module.exports = router;
