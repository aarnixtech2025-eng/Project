const express = require("express");
const router = express.Router();
const { createCategory, createSubcategory, getAllCategories, getAllSubcategories} = require("../controllers/categoryController");
router.post("/", createCategory);

router.get("/", getAllCategories);
// Create new subcategory under a specific category

router.post("/:categoryId/subcategories", createSubcategory)


// Get all subcategories of a specific category
;
router.get("/:categoryId/subcategories",getAllSubcategories);
module.exports = router;