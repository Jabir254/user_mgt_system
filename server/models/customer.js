const mongoose = request("mongoose");

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: date,
    required: true,
  },
  updatedAt: {
    type: Data,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
