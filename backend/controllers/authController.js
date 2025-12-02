

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");   // MUST be the CommonJS model from step 1
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const crypto = require("crypto"); 



///
exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    // Verify token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name || payload.given_name || "Google User";
    const googleId = payload.sub;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Google account has no email associated." });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // You can store googleId however you like (e.g. user.googleId)
      const hashed = await bcrypt.hash(googleId, 10);

      user = await User.create({
        username: name,
        email,
        password: hashed, // not actually used for Google, just to satisfy schema
      });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};


// ======================== EMAIL TRANSPORTER ========================
/*const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
*/

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ======================== SIGNUP ========================
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });

    await user.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================== LOGIN ========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================== PHONE LOGIN (unchanged) ========================
exports.phoneLogin = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });

    let user = await User.findOne({ phone });

    if (!user) {
      const fakeEmail = `${phone}@phone.local`;
      const hashed = await bcrypt.hash(phone, 10);
      user = new User({
        username: "User_" + phone.slice(-4),
        email: fakeEmail,
        password: hashed,
        phone,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      message: "Phone login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Phone login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ========================================================================
// ============================ SEND OTP ==================================
// ========================================================================
exports.sendOtp = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email is already registered. Please log in." });

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Save or update OTP doc
    await Otp.findOneAndUpdate(
      { email },
      { code, expiresAt },
      { upsert: true, new: true }
    );

    // Send mail
    await transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "Your OTP Code",
      html: `
        <p>Hello ${username || "there"},</p>
        <p>Your email verification code is:</p>
        <h2>${code}</h2>
        <p>This code expires in <strong>10 minutes</strong>.</p>
      `,
    });

    res.json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("OTP send error:", err);
    res
      .status(500)
      .json({ message: "Server error sending OTP: " + err.message });
  }
};

// ========================================================================
// ============================ VERIFY OTP ================================
// ========================================================================
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp, username, password, country } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const otpDoc = await Otp.findOne({ email });
    if (!otpDoc)
      return res.status(400).json({ message: "OTP not found for this email" });

    if (otpDoc.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    if (otpDoc.code !== otp)
      return res.status(400).json({ message: "Incorrect OTP" });

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      country,
    });

    // Remove OTP after success
    await Otp.deleteOne({ _id: otpDoc._id });

    res.json({
      message: "Signup successful",
      userId: user._id,
    });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ message: "Server error verifying OTP." });
  }
};
// ========================================================================
// ========================= FORGOT PASSWORD ==============================
// ========================================================================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // Always respond with generic message (don't leak if user exists)
    const genericMsg =
      "If this email is registered, a password reset link has been sent.";

    if (!user) {
      return res.json({ message: genericMsg });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "Password reset request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to set a new password. This link is valid for 15 minutes:</p>
        <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return res.json({ message: genericMsg });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
// ========================================================================
// ========================== RESET PASSWORD ===============================
// ========================================================================
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    // Hash incoming token and look up user
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update password
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({ message: "Password reset successful. Please log in." });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
