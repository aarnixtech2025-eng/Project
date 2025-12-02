const TrendingCategory = require("../models/TrendingCategory");

exports.getTrending = async (req, res) => {
  try {
    const list = await TrendingCategory.find({});
    res.json(list);
  } catch (err) {
    console.error("Trending fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTrending = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) return res.status(400).json({ message: "Name & image required" });
    const item = new TrendingCategory({ name, image });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error("Create trending error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
