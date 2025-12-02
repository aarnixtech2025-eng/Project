import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function SignInOrCreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // PHONE STATES
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [loadingOtp, setLoadingOtp] = useState(false);

  // 🔐 FORGOT PASSWORD STATES
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  // COMMON LOGIN HELPER
  const finishLogin = (res) => {
    localStorage.setItem("authToken", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    // reload so Navbar updates username (keeps previous behavior)
    window.location.href = "/";
  };

  // EMAIL LOGIN
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      finishLogin(res);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");
    setError("");

    const emailToUse = (forgotEmail || email).trim();
    if (!emailToUse) {
      setForgotMessage("Please enter your email.");
      return;
    }

    try {
      setForgotLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email: emailToUse }
      );

      setForgotMessage(
        res.data?.message ||
          "If this email is registered, a reset link has been sent."
      );
    } catch (err) {
      setForgotMessage(
        err.response?.data?.message ||
          "Unable to send reset link. Please try again."
      );
    } finally {
      setForgotLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError("");
      const idToken = credentialResponse.credential;
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          idToken,
        }
      );
      finishLogin(res);
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google login was cancelled or failed.");
  };

  // ✅ Setup reCAPTCHA on mount (correct signature for modular Firebase v9)
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container", // container ID
          {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA solved
              console.log("reCAPTCHA solved:", response);
            },
            "expired-callback": () => {
              console.log("reCAPTCHA expired");
            },
          },
          auth // auth as THIRD argument
        );
      } catch (err) {
        console.warn("Recaptcha setup warning:", err);
      }
    }

    return () => {
      // cleanup: clear instance if created by this page
      if (window.recaptchaVerifier && window.recaptchaVerifier.clear) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          // ignore
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // ✅ send OTP via firebase (using correct RecaptchaVerifier signature)
  const sendOtp = async () => {
    setOtpMessage("");
    setError("");

    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setOtpMessage("Enter a valid phone number.");
      return;
    }

    setLoadingOtp(true);

    try {
      // use existing recaptchaVerifier or create new, with correct args
      let appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        appVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
          },
          auth
        );
        window.recaptchaVerifier = appVerifier;
      }

      // normalize phone number: if user entered country code use it, otherwise assume +91
      let digits = phone.replace(/\s+/g, "");
      if (!digits.startsWith("+")) {
        // default assumption: India +91
        digits = "+91" + digits.replace(/^0+/, "");
      }

      console.log("Sending OTP to:", digits);

      const confirmation = await signInWithPhoneNumber(
        auth,
        digits,
        appVerifier
      );
      setConfirmResult(confirmation);
      setOtpSent(true);
      setOtpMessage("OTP sent successfully!");
    } catch (err) {
      console.error("sendOtp error:", err);
      setOtpMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoadingOtp(false);
    }
  };

  // verify OTP and call backend
  const verifyOtp = async () => {
    if (!confirmResult) {
      setOtpMessage("Please send OTP first.");
      return;
    }

    try {
      const result = await confirmResult.confirm(otp);
      const firebaseUser = result.user;
      console.log("Firebase user after OTP:", firebaseUser.uid);

      // Backend login/create based on phone number
      const res = await axios.post(
        "http://localhost:5000/api/auth/phone-login",
        {
          phone,
        }
      );

      finishLogin(res);
    } catch (err) {
      console.error("verifyOtp error:", err);
      setOtpMessage("Invalid or expired OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Sign in or create account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <div className="space-y-3 mb-6">
          {/* GOOGLE LOGIN */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          {/* PHONE OTP LOGIN */}
          <div className="w-full border border-gray-300 rounded-lg px-3 py-3">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number (e.g. +919876543210 or 9876543210)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {!otpSent ? (
              <button
                type="button"
                onClick={sendOtp}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                disabled={loadingOtp}
              >
                {loadingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  type="button"
                  onClick={verifyOtp}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
                >
                  Verify OTP
                </button>
              </>
            )}

            {otpMessage && (
              <p className="mt-2 text-xs text-center text-blue-600">
                {otpMessage}
              </p>
            )}

            {/* Firebase needs this div for invisible reCAPTCHA */}
            <div id="recaptcha-container" />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs uppercase tracking-wide text-gray-400">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* EMAIL LOGIN */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter your email address
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Forgot password toggle */}
            <button
              type="button"
              className="mt-2 text-xs text-blue-600 hover:underline"
              onClick={() => setShowForgot((prev) => !prev)}
            >
              {showForgot ? "Close forgot password" : "Forgot password?"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-red-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-600 transition"
          >
            Continue
          </button>
        </form>

        {/* FORGOT PASSWORD PANEL */}
        {showForgot && (
          <div className="mt-4 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-800 mb-2">
              Reset your password
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Enter the email associated with your account and we&apos;ll send
              you a link to reset your password.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-3">
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Your email address"
                value={forgotEmail || email}
                onChange={(e) => setForgotEmail(e.target.value)}
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
                disabled={forgotLoading}
              >
                {forgotLoading ? "Sending..." : "Send reset link"}
              </button>
            </form>

            {forgotMessage && (
              <p className="mt-2 text-xs text-center text-gray-600">
                {forgotMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignInOrCreateAccount;
