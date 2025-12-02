const Christ = require("../models/Christmas");

exports.getAll = async (req, res) => {
  try {
    const data = await Christ.find({});
    res.json(data);
  } catch (err) {
    console.error("Christmas get error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const doc = new Christ(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error("Christmas create error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
