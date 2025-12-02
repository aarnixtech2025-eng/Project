const mongoose = require("mongoose");

const ChristmasSchema = new mongoose.Schema({
  title: String,
  image: String,
  items: [String]
}, { timestamps: true });

module.exports = mongoose.model("Christmas", ChristmasSchema);
