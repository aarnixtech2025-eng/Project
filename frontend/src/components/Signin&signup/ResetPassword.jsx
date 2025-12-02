import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-sm">
          Invalid password reset link (no token found).
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { token, password }
      );
      setMessage(res.data?.message || "Password reset successful.");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Reset your password
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 px-3 py-2 rounded-md">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
            } text-white py-2 rounded-full text-sm font-semibold`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
