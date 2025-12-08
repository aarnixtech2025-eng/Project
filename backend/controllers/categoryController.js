// controllers/categoryController.js
const Category = require("../models/Categorymodel"); // ✅ make sure file is models/Category.js

// --------------------------------------------------
// CREATE NEW CATEGORY
// --------------------------------------------------
exports.createCategory = async (req, res) => {
  try {
    const { categoryname, image, subcategories } = req.body;

    // Validation
    if (!categoryname) {
      return res.status(400).json({ message: "categoryname is required" });
    }

    const category = new Category({
      categoryname,
      image: image || "",
      // subcategories can already include contact/productname/etc. if you send them
      subcategories: subcategories || [] // must match SubCategorySchema
    });

    const saved = await category.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error("Create Category Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// --------------------------------------------------
// GET ALL CATEGORIES (with subcategories)
// --------------------------------------------------
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Get Categories Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// --------------------------------------------------
// CREATE SUBCATEGORY UNDER A CATEGORY
// --------------------------------------------------
exports.createSubcategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { productname, image, price, currency, quantity, unit, contact } =
      req.body;

    if (!productname) {
      return res.status(400).json({ message: "productname is required" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategory = {
      productname,
      image: image || "",
      price: price || "",
      currency: currency || "",
      quantity: quantity || "",
      unit: unit || "",
      contact: contact || "" // ✅ now saved in subcategory
    };

    category.subcategories.push(subcategory);
    const updated = await category.save();

    return res.status(201).json(updated);
  } catch (error) {
    console.error("Create Subcategory Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// --------------------------------------------------
// GET ALL SUBCATEGORIES FOR A CATEGORY
// --------------------------------------------------
exports.getAllSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category.subcategories);
  } catch (error) {
    console.error("Get Subcategories Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};



