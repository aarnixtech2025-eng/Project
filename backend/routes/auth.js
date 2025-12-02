// routes/auth.js
import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Otp from "../models/Otp.js";
import User from "../models/User.js";

const router = express.Router();

// configure nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // or your SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/send-otp
router.post("/send-otp", async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // optional: prevent sending OTP if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered. Please log in." });
    }

    // generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    // upsert OTP for this email
    await Otp.findOneAndUpdate(
      { email },
      { code, expiresAt },
      { upsert: true, new: true }
    );

    // send email with OTP
    await transporter.sendMail({
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject: "Your OTP Code",
      html: `
        <p>Hi ${username || "there"},</p>
        <p>Your verification code is:</p>
        <h2>${code}</h2>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    return res.json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error sending OTP." });
  }
});
