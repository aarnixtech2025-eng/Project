const mongoose = require("mongoose");

const RequirementSchema = new mongoose.Schema({
  product: String,
  mobile: String,
  loan: String
}, { timestamps: true });

module.exports = mongoose.model("Requirement", RequirementSchema);
