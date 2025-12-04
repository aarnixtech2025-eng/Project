app.post("/api/business-profile", async (req, res) => {
  try {
    const profile = new BusinessProfile(req.body);
    await profile.save();
    res.status(201).json({ success: true, profile });
  } catch (err) {
    console.error("Save business profile error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});