const Category = require("../models/Categorymodel");

// Get all categories with their subcategories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific category by ID (with subcategories)
exports.getCategoryById = async (req, res) => {
  const { id } = req.params; // Extract the category ID from the URL

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Return the full category (including subcategories)
    res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get only subcategories of a specific category
exports.getCategorySubcategories = async (req, res) => {
  const { id } = req.params; // category ID

  try {
    // Only select the subcategories field
    const category = await Category.findById(id).select("subcategories");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ subcategories: category.subcategories });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new category with subcategories
exports.createCategory = async (req, res) => {
  const { name, subcategories } = req.body;

  try {
    const category = new Category({ name, subcategories });
    await category.save();

    res.status(201).json({ category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a subcategory to an existing category
exports.addSubcategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.subcategories.push({ name });
    await category.save();

    res.status(200).json({ category });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    res.status(500).json({ message: "Server error" });
  }
};
