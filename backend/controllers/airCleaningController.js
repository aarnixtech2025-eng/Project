const AirCleaning = require("../models/AirCleaning");

exports.getAll = async (req, res) => {
  try {
    const data = await AirCleaning.find({});
    res.json(data);
  } catch (err) {
    console.error("AirCleaning get error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const doc = new AirCleaning(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error("AirCleaning create error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
