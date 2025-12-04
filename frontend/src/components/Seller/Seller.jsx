// CreateAnAccount.jsx
import React, { useState, useEffect } from "react";
import SignInOrCreateAccount from "../Signin&signup/SignInOrCreateAccount";
import Dashboard from "../Dashboard"

export default function Seller() {
  // try to read user from localStorage on first load
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // called when login succeeds inside SignInOrCreateAccount
  const handleLogin = (userFromServer) => {
    setUser(userFromServer); // this will switch to Dashboard
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null); // go back to login form
  };

  // 🔥 THIS is the key: conditional rendering inside THIS component
  if (!user) {
    return (
      <SignInOrCreateAccount onLogin={handleLogin} />
    );
  }

  // if user is not null, show dashboard
  return (
    <Dashboard user={user} onLogout={handleLogout} />
  );
}
