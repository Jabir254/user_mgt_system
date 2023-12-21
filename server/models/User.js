const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: String,
    default: "Basic",
  },
});

module.exports = mongoose.model("User", UserSchema);
