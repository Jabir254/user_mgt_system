const express = require("express");
const router = express.Router();
const register = require("../controllers/userAuth");
const { adminAuth } = require("../middleware/auth");

router.post("/register",register.register);
router.post("/login", register.login);
router.get("/getUsers", register.getUsers);

router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);
module.exports = router;

