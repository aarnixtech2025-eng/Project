const User = require("../models/User");

exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("User count error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
