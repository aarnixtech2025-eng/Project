import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SellerNavbar from "./SellerNavbar";

const navItems = [
  { label: "User Profile", path: "/seller/user-profile" },
  { label: "Business Profile", path: "/seller/business-profile" },
  { label: "Bank Details", path: "/seller/bank-details" },
  { label: "Manage Users", path: "/seller/manage-users" },
  { label: "Settings", path: "/seller/settings" },
];

export default function BankDetails() {
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
                  ${isActive
                    ? "bg-gradient-to-r from-[#7b3ae3] to-[#5b3fd0] text-white shadow-lg shadow-[#7b3ae3]/50"
                    : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
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

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-6 lg:py-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page title */}
            <div className="mb-6 lg:mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-1">
                Seller Portal
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold">Bank Details</h1>
            </div>

            {/* PROFILE HEADER (keep same style) */}
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

            {/* BANK DETAILS FORM (styled same, labels/inputs changed) */}
            <section className="rounded-[32px] bg-white/8 border border-white/12 backdrop-blur-2xl px-0 lg:px-0 py-0 shadow-[0_22px_60px_rgba(0,0,0,0.5)]">
              {/* Top accordion-style header bar */}
              <div className="rounded-t-[32px] bg-slate-500/90 px-6 lg:px-10 py-3 flex items-center justify-between">
                <h2 className="text-sm md:text-base font-semibold text-white">
                  Account Details
                </h2>
                <span className="text-white text-lg leading-none">▾</span>
              </div>

              <div className="px-6 lg:px-10 py-6">
                <form className="space-y-6">
                  {/* Account Type – full width */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wide text-gray-200 mb-1.5">
                      Account Type
                    </label>
                    <select className="w-full rounded-2xl bg-white/6 border border-white/20 px-4 py-3 text-black text-sm">
                      <option>Current Account</option>
                      <option>Savings Account</option>
                      <option>Overdraft Account</option>
                    </select>
                  </div>

                  {/* Two-column grid like screenshot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Holder Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-gray-200 mb-1.5">
                        Account Holder Name<span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl bg-white/6 border border-white/20 px-4 py-3 text-black text-sm"
                        placeholder="Account Holder Name"
                      />
                    </div>

                    {/* Account Number */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-gray-200 mb-1.5">
                        Account Number<span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl bg-white/6 border border-white/20 px-4 py-3 text-black text-sm"
                        placeholder="Account Number"
                      />
                    </div>

                    {/* Confirm Account Number */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-gray-200 mb-1.5">
                        Confirm Account Number<span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl bg-white/6 border border-white/20 px-4 py-3 text-black text-sm"
                        placeholder="Re-enter Account Number"
                      />
                    </div>

                    {/* IFSC Code */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-gray-200 mb-1.5">
                        IFSC Code<span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl bg-white/6 border border-white/20 px-4 py-3 text-black text-sm"
                        placeholder="IFSC Code"
                      />
                    </div>
                  </div>

                  {/* Number Linked – full width */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wide text-gray-200 mb-1.5">
                      Number Linked<span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl bg-white/6 border border-white/20 px-4 py-3 text-black text-sm"
                      placeholder="Mobile number linked with bank"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="pt-2 flex justify-end md:justify-end">
                    <button
                      type="button"
                      className="w-full md:w-[220px] px-10 py-3 rounded-full bg-[#226996] text-sm font-semibold shadow-[0_14px_40px_rgba(0,0,0,0.35)] hover:brightness-110 hover:-translate-y-[1px] transition"
                    >
                      SAVE DETAILS
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
