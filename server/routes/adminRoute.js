const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("first_name")
    .not()
    .isEmpty()
    .withMessage("You first name is required")
    .trim()
    .escape(),
  check("last_name")
    .not()
    .isEmpty()
    .withMessage("You last name is required")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),
  Validate,
  adminController.addAdmin
);
router.post("/dashboard", adminController.postDashboard);
router.get("/signin", adminController.loginAdmin);

module.exports = router;
