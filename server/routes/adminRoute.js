const express = require("express");
const router = express.Router();
const Validate = require("../middleware/validate");
const adminController = require("../controllers/adminController");
const check = require("express-validator").check;

/**
 * route to register an admin
 */
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


/**
 * route to login an admin
 */
router.post(
  "/signin",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email Address")
    .normalizeEmail(),
  check("password").not().isEmpty(),
  Validate,
  adminController.Login
);

/**
 * loggin out
 */
router.get("/logout", adminController.Logout);

module.exports = router;
