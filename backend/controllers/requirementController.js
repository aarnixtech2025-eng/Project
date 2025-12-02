const Requirement = require("../models/Requirement");

exports.create = async (req, res) => {
  try {
    const { product, mobile, loan } = req.body;
    const doc = new Requirement({ product, mobile, loan });
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error("Requirement create:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
