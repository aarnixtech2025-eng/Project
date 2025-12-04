import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function FinalNavbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (err) {
        console.log("User parse error:", err);
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/"); // redirect to home
  };

  // ✅ GOOGLE TRANSLATE INITIALIZATION
  useEffect(() => {
    // run only in browser
    if (typeof window === "undefined") return;

    const initTranslate = () => {
      if (
        window.google &&
        window.google.translate &&
        !window._googleTranslateInitialized
      ) {
        window._googleTranslateInitialized = true; // prevent double init

        // create the widget inside #google_translate_element
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,mr,kn,ta,te,gu,bn,pa,ml",
            autoDisplay: false,
            layout:
              window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          },
          "google_translate_element"
        );
      }
    };

    // try immediately (in case script is already loaded)
    initTranslate();

    // if script isn't ready yet, poll until it is
    const intervalId = setInterval(() => {
      initTranslate();
      if (window._googleTranslateInitialized) {
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav
      className={
        "sticky top-0 z-50 transition-shadow duration-300 " +
        (scrolled ? "shadow-lg" : "shadow-sm")
      }
      aria-label="Main Navigation"
    >
      <div
        className={
          "bg-blue/300 backdrop-blur-sm " +
          "container mx-auto px-6 py-4 flex items-center justify-between"
        }
      >
        {/* LOGO */}
        <Link to="/" aria-label="Go to homepage">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo2.png"
              alt="Logo"
              className="h-12 drop-shadow-md hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* CENTER LINKS */}
        

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          {/* GOOGLE TRANSLATE DROPDOWN */}
          <div
            id="google_translate_element"
            className="translate-widget"
          ></div>

          {/* AUTH BUTTONS */}
          {user ? (
            <div className="flex items-center gap-4 nav-auth">
              <span className="text-gray-800 font-semibold text-sm">
                Hi, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg text-xs hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 nav-auth">
              <div className="py-2 px-5 rounded-lg text-sm shadow-md hover:bg-blue-600">
                <Link to="/login" className="text-black text-sm font-semibold">
                  Login
                </Link>
              </div>
              <Link
                to="/signup"
                className="bg-gray-900 hover:bg-blue-700 text-white py-2 px-5 rounded-lg text-sm shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
