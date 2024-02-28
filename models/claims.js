const mongoose = require("mongoose");

const claimsSchema = new mongoose.Schema({
  ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PolicyHolders",
  },
  claimNumber: { type: String, required: true },
  lineOfBusiness: { type: String },
  insuredFullName: { type: String },
  insuredFName: { type: String },
  insuredLName: { type: String },
  insuredDOB: { type: String },
  dateOfDeath: { type: String },
  Status: { type: String, enum: ["Single", "Married","Divorced"] },
  effectiveDate: { type: String },
  insuredState: { type: String },
});

module.exports = mongoose.model("Claims", claimsSchema);
