const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      max: 25,
    },
    role: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);
adminSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

adminSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jsonwebtoken.sign(payload, `${process.env.jwtSecret}`, {
    expiresIn: "20m",
  });
};
module.exports = mongoose.model("admin", adminSchema);
