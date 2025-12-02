const mongoose = require("mongoose");

const AirCleaningSchema = new mongoose.Schema({
  title: String,
  image: String,
  items: [String]
}, { timestamps: true });

module.exports = mongoose.model("AirCleaning", AirCleaningSchema);
