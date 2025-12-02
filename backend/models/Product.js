const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true },
    unit: { type: String, default: "Unit" },
    rating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
