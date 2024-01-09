const express = require("express");
const router = express.Router();
const Validate = require("../middleware/validate");
const adminController = require("../controllers/adminController");
const check = require("express-validator").check;
router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("You first name is required")
    .trim()
    .escape(),
  check("lastName")
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
  adminController.Register
);
module.exports = router;
