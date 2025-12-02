const express = require("express");
const router = express.Router();
const { getProducts, createProduct } = require("../controllers/productController");

router.get("/", getProducts);     // Fetch all
router.post("/", createProduct);  // Create new

module.exports = router;
