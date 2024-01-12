const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    courseInterest: { type: String, required: true },
    phone: { type: Number, required: true },
    claimedBy: { type: String, default: null },
  },
  { versionKey: false }
);

const ClientModel = mongoose.model("Enqueiries_Form", ClientSchema);

module.exports = { ClientModel };
