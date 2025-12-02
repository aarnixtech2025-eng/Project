import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SetupAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    country: "India",
    email: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    setError("");
    const email = form.email.trim();
    const password = form.password || "";

    if (!email) return "Email is required.";
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      return "Please use a Gmail address (ending with @gmail.com).";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!form.firstName.trim() || !form.lastName.trim()) {
      return "First and last name are required.";
    }
    return "";
  };

  // STEP 1: send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);

    const username = `${form.firstName.trim()} ${form.lastName.trim()}`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        {
          email: form.email.trim(),
          username,
        }
      );

      setSuccess(response.data?.message || "OTP sent to your email.");
      setStep(2); // move to OTP step
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: verify OTP and create account
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    setLoading(true);

    const username = `${form.firstName.trim()} ${form.lastName.trim()}`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: form.email.trim(),
          otp: otp.trim(),
          username,
          password: form.password,
          country: form.country,
        }
      );

      setSuccess(response.data?.message || "Signup successful!");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (step === 1) {
      handleSendOtp(e);
    } else {
      handleVerifyOtp(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Set up your account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 px-3 py-2 rounded-md">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email (Gmail only)
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
              disabled={step === 2}
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
              disabled={step === 2}
            >
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>

          {/* FIRST + LAST NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
              required
              disabled={step === 2}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
              required
              disabled={step === 2}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Create a password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
              placeholder="At least 8 characters"
              disabled={step === 2}
            />
          </div>

          {/* OTP FIELD (STEP 2) */}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 tracking-widest"
                placeholder="6-digit code"
              />
              <p className="mt-1 text-xs text-gray-500">
                We&apos;ve sent a 6-digit code to your email.
              </p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"
            } text-white py-2 rounded-full`}
            disabled={loading}
          >
            {loading
              ? step === 1
                ? "Sending OTP..."
                : "Verifying..."
              : step === 1
              ? "Send OTP"
              : "Verify & Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetupAccount;
