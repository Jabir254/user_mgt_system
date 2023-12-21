const express = require("express");
const router = express.Router();
const register = require("../controllers/userAuth");
const  adminAuth  = require("../middleware/auth");

router.post("/register",register.register);
router.post("/login", register.login);
router.get("/getUsers", register.getUsers);

router.put("/update", register.update);
router.delete("/deleteUser", register.deleteUser);

module.exports = router;

