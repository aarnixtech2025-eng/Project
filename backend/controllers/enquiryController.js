const Enquiry = require("../models/Enquiry");

exports.create = async (req, res) => {
  try {
    const entry = new Enquiry(req.body);
    await entry.save();
    res.status(201).json({ success: true, message: "Enquiry stored", data: entry });
  } catch (err) {
    console.error("Enquiry store error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
