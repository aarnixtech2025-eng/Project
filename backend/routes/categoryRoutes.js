// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

// Get all categories with their subcategories
router.get("/", categoryController.getAllCategories);

// Get a specific category (with subcategories)
router.get("/:id", categoryController.getCategoryById);

// ✅ Get only subcategories of a specific category
router.get("/:id/subcategories", categoryController.getCategorySubcategories);

// Create a new category with subcategories
router.post("/", categoryController.createCategory);

// Add a subcategory to an existing category
router.post("/:categoryId/subcategory", categoryController.addSubcategory);

module.exports = router;
