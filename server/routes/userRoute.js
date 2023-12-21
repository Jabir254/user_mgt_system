const express = require("express");
const router = express.Router();
const register = require("../controllers/userAuth");

router.post("/register", register.userSign);
router.post("/login", register.Login);
router.put("/update", register.update);
router.delete("/deleteuser", register.deleteUser);

module.exports = router;
