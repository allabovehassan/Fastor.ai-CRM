const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const employeeModel = mongoose.model("Registered_Employee", employeeSchema);

module.exports = { employeeModel };
