// POST /api/verify-otp
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, username, password, country } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const otpDoc = await Otp.findOne({ email });

    if (!otpDoc) {
      return res.status(400).json({ message: "No OTP found for this email" });
    }

    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (otpDoc.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid -> create user
    // TODO: hash password with bcrypt before saving in real app
    const user = await User.create({
      username,
      email,
      password,
      country,
    });

    // delete used OTP
    await Otp.deleteOne({ _id: otpDoc._id });

    return res.json({ message: "Signup successful", userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error verifying OTP." });
  }
});

export default router;
