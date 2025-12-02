module.exports = (err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
};
