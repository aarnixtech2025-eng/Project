const mongoose = require('mongoose');

// Subcategory schema
const subcategorySchema = new mongoose.Schema(
  {
    name:  { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Category schema
const CategorySchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    image:       { type: String, required: true },
    product:     { type: Number, default: 0 }, 
    subcategories: [subcategorySchema],       
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
