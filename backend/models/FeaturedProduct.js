const mongoose = require("mongoose");

const featuredProductSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: String },
  unit:     { type: String },
  image:    { type: String, required: true },
  supplier: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("FeaturedProduct", featuredProductSchema);
