// routes/SellerRoutes/Userprofileroutes.js

const express = require("express");
const router = express.Router();

const {
  createUserProfile,
  getUserProfiles,
  getUserProfileById
} = require("../../controllers/SellerDashboard/UserProfileController");

// Debug check (optional)
console.log("Loaded handlers:", {
  createUserProfile: typeof createUserProfile,
  getUserProfiles: typeof getUserProfiles,
  getUserProfileById: typeof getUserProfileById,
});

router.post("/", createUserProfile);
router.get("/", getUserProfiles);
router.get("/:id", getUserProfileById);

module.exports = router;
