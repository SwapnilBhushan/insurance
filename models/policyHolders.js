const mongoose = require("mongoose");

const policyHoldersSchema = new mongoose.Schema({
  insuredFirstName: { type: String, required: true },
  insuredLastName: { type: String, required: true },
  Age: { type: String, required: true },
  DateOfBirth: { type: String, required: true },
  State: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  PhoneNumber: { type: String, required: true, unique: true },
  Status: {
    type: String,
    required: true,
    enum: ["Single", "Married", "Divorced"],
  },
  Beneficiaries: { type: String, required: true },
  Relationship: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PolicyHolder", policyHoldersSchema);
