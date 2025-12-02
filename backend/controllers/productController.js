// controllers/productController.js
const Product = require("../models/Product");

// GET /api/products  (fetch all products)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/products  (create/store new product)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};
