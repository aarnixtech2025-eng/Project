import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SellerNavbar from "../components/Seller/SellerNavbar";

const navItems = [
  { label: "User Profile", path: "/seller/user-profile" },
  { label: "Business Profile", path: "/seller/business-profile" },
  { label: "Bank Details", path: "/seller/bank-details" },
  { label: "Manage Users", path: "/seller/manage-users" },
  { label: "Settings", path: "/seller/settings" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);

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

  if (!user) {
    return (
      <>
        <SellerNavbar />
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-[#15163b] via-[#231f57] to-[#6b3fe0] text-white">
          Loading profile…
        </div>
      </>
    );
  }

  const name = user.username || user.name || "User";
  const initial = name[0]?.toUpperCase() ?? "?";

  const profileData = {
    name,
    location: "Buldana, Maharashtra, India",
    email: user.email || "demo@gmail.com",
    officeContact: user.officeContact || "+91 8398521889",
  };

  return (
    <>
      <SellerNavbar />

      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#15163b] via-[#231f57] to-[#6b3fe0] text-white flex">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gradient-to-b from-[#111728] via-[#111427] to-[#111020] border-r border-white/10 flex flex-col shadow-[12px_0_40px_rgba(0,0,0,0.35)]">
          {/* Logo */}
          <div className="px-7 pt-7 pb-9 border-b border-white/5">
            <div className="text-2xl font-semibold leading-tight tracking-tight">
              <span className="block text-white">trade</span>
              <span className="block text-[#f3b244] -mt-1">indis.</span>
            </div>
          </div>

          {/* Nav with ROUTES */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `group w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#7b3ae3] to-[#5b3fd0] text-white shadow-lg shadow-[#7b3ae3]/50"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      ●
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/5 text-xs text-gray-400">
            © {new Date().getFullYear()} trade indis.
          </div>
        </aside>

        {/* MAIN CONTENT – Manage Users */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-6 lg:py-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page title */}
            <div className="mb-6 lg:mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-1">
                Seller Portal
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold">Manage Users</h1>
            </div>

            {/* PROFILE HEADER (keep same style for consistency) */}
            <section className="mb-7 lg:mb-9">
              <div className="rounded-[32px] bg-white/10 border border-white/15 backdrop-blur-2xl px-6 lg:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-[#7b3ae3] to-[#5b3fd0] flex items-center justify-center text-3xl font-semibold shadow-[0_0_0_6px_rgba(123,58,227,0.4)]">
                    {initial}
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-semibold capitalize">
                      {profileData.name}
                    </p>
                    <p className="text-sm text-gray-100/80 flex items-center gap-1.5 mt-1">
                      <span className="text-base">📍</span>
                      {profileData.location}
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:items-end">
                  <span className="inline-flex items-center rounded-full bg-emerald-400/15 text-emerald-200 text-xs px-3 py-1 border border-emerald-300/40">
                    ● Profile 80% complete
                  </span>
                  <button className="hidden md:inline-flex text-xs text-white/70 hover:text-white underline">
                    View public profile
                  </button>
                </div>
              </div>
            </section>

            {/* EMPTY STATE CARD LIKE SCREENSHOT */}
            <section className="rounded-[32px] bg-white/95 text-gray-800 border border-white/50 px-6 lg:px-10 py-12 shadow-[0_22px_60px_rgba(0,0,0,0.45)]">
              <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                {/* Illustration-style icon */}
                <div className="mb-6">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-md">
                    <span className="text-4xl">👥</span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-2">No User Available</h2>

                <p className="text-sm text-gray-600 mb-2">
                  Add multiple users and turn your master account into multiple
                  sub-accounts.
                </p>

                <p className="text-sm text-gray-600 mb-8">
                  Multiple sub-accounts allow you to control user roles, grant
                  permissions to selected accounts to manage a task, and allow
                  unique logins.
                </p>

                <button
                  type="button"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#226996] text-white text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:brightness-110 hover:-translate-y-[1px] transition"
                >
                  <span className="text-lg mr-2">＋</span>
                  Add New User
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
