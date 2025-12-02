const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

// existing
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.post("/phone-login", authCtrl.phoneLogin);

// NEW: email OTP routes
router.post("/send-otp", authCtrl.sendOtp);
router.post("/verify-otp", authCtrl.verifyOtp);
router.post("/google-login", authCtrl.googleLogin);
// 🔐 Forgot password
router.post("/forgot-password", authCtrl.forgotPassword);
router.post("/reset-password", authCtrl.resetPassword);
module.exports = router;
