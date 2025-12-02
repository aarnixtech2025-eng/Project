// models/Otp.js
const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true }, // 6-digit string
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("Otp", otpSchema);
