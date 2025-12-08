// models/Category.js
const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  productname: { type: String, required: true },
  image: { type: String, default: "" },
  price: { type: String, default: "" },
  currency: { type: String, default: "" },
  quantity: { type: String, default: "" },
  unit: { type: String, default: "" },
  contact: { type: String, required: true },

});

const CategorySchema = new mongoose.Schema(
  {
    categoryname: { type: String, required: true }, // matches controller
    image: { type: String, default: "" },
    subcategories: [SubCategorySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
