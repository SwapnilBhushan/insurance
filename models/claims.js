const mongoose = require("mongoose");

const claimsSchema = new mongoose.Schema({
  ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PolicyHolders",
  },
  claimNumber: { type: Number, required: true },
  lineOfBusiness: { type: String },
  insuredFullName: { type: String },
  insuredFName: { type: String },
  insuredLName: { type: String },
  insuredDOB: { type: Date },
  dateOfDeath: { type: Date },
  Status: { type: String, enum: ["Single", "Married"] },
  effectiveDate: { type: Date },
  insuredState: { type: String },
});

module.exports = mongoose.model("Claims", claimsSchema);
