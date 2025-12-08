// controllers/SellerDashboard/UserProfileController.js

// Example model (change to your actual model)
const UserProfile = require("../../models/Sellermodel/UserProfileModel")

// -----------------------------------------------------
// CREATE USER PROFILE
// -----------------------------------------------------
exports.createUserProfile = async (req, res) => {
  try {
    const profile = new UserProfile(req.body);
    const saved = await profile.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create Profile Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// -----------------------------------------------------
// GET ALL USER PROFILES
// -----------------------------------------------------
exports.getUserProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Get Profiles Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// -----------------------------------------------------
// GET USER PROFILE BY ID
// -----------------------------------------------------
exports.getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await UserProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
