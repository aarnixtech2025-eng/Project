import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import SellerNavbar from "./SellerNavbar";

const navItems = [
  { label: "User Profile", path: "/seller/user-profile" },
  { label: "Business Profile", path: "/seller/business-profile" },
  { label: "Bank Details", path: "/seller/bank-details" },
  { label: "Manage Users", path: "/seller/manage-users" },
  { label: "Settings", path: "/seller/settings" },
];

const API_BASE_URL = "http://localhost:5000/api/user-profile";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    officeContact: "",
    alternateMobile: "",
    whatsappNumber: "",
    designation: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);

        // If your auth user already has some of these fields, prefill:
        setFormData((prev) => ({
          ...prev,
          firstName: parsed.firstName || parsed.username || "",
          lastName: parsed.lastName || "",
          officeContact: parsed.officeContact || "",
        }));
      } catch (err) {
        console.log("User parse error:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage("");

    try {
      const payload = {
        userId: user._id || user.id, // adjust to however you store it
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: user.email,
        officeContact: formData.officeContact,
        alternateMobile: formData.alternateMobile,
        whatsappNumber: formData.whatsappNumber,
        designation: formData.designation,
      };

      const res = await axios.post(
        `${API_BASE_URL}/api/user-profile`,
        payload
      );

      console.log("User profile saved:", res.data);
      setMessage("Profile saved successfully ✅");
    } catch (err) {
      console.error("Save failed:", err);
      setMessage(
        err.response?.data?.error || "Failed to save profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <>
<SellerNavbar/>
        <div
          className="min-h-[calc(100vh-64px)] flex items-center justify-center 
          bg-gradient-to-br from-[#15163b] via-[#231f57] to-[#6b3fe0] text-white"
        >
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

      <div
        className="min-h-[calc(100vh-64px)] 
        bg-gradient-to-br from-[#15163b] via-[#231f57] to-[#6b3fe0]
        text-white flex"
      >
        {/* SIDEBAR */}
        <aside
          className="w-64 
          bg-gradient-to-b from-[#15163b] via-[#231f57] to-[#15163b]
          border-r border-white/10 flex flex-col shadow-[12px_0_40px_rgba(0,0,0,0.45)]"
        >
          <div className="px-7 pt-7 pb-9 border-b border-white/5">
            <div className="text-2xl font-semibold leading-tight tracking-tight">
              <span className="block text-white">trade</span>
              <span className="block text-[#f3b244] -mt-1">indis.</span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `group w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#3bb7ff] via-[#45c7ff] to-[#7b3ae3] text-white shadow-lg shadow-[#45c7ff]/40"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        isActive
                          ? "bg-white/20"
                          : "bg-white/5 group-hover:bg-white/10"
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

          <div className="px-6 py-4 border-t border-white/5 text-xs text-gray-400">
            © {new Date().getFullYear()} trade indis.
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-6 lg:py-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <div className="mb-6 lg:mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-1">
                Seller Portal
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold">
                User Profile
              </h1>
            </div>

            {/* PROFILE HEADER */}
            <section className="mb-7 lg:mb-9">
              <div
                className="rounded-[32px] bg-white/10 border border-white/15 backdrop-blur-2xl 
                px-6 lg:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between 
                gap-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center gap-5">
                  <div
                    className="h-16 w-16 md:h-20 md:w-20 rounded-full 
                    bg-gradient-to-br from-[#3bb7ff] via-[#45c7ff] to-[#7b3ae3] 
                    flex items-center justify-center text-3xl font-semibold 
                    shadow-[0_0_0_6px_rgba(69,199,255,0.45)]"
                  >
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

            {/* PERSONAL DETAILS FORM */}
            <section
              className="rounded-[32px] bg-white/5 border border-white/12 backdrop-blur-3xl 
              px-6 lg:px-10 py-6 shadow-[0_22px_60px_rgba(0,0,0,0.65)]"
            >
              <h2 className="text-base md:text-lg font-semibold mb-6">
                Personal Details
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1.5">
                      First Name <span className="text-[#ff5c9a]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white/5 bg-gradient-to-br from-slate-900/70 to-slate-950/70 
                      border border-white/15 px-4 py-3 text-white text-sm placeholder-white/40 
                      outline-none focus:border-[#45c7ff] focus:ring-2 focus:ring-[#45c7ff]/40"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white/5 bg-gradient-to-br from-slate-900/70 to-slate-950/70 
                      border border-white/15 px-4 py-3 text-white text-sm placeholder-white/40 
                      outline-none focus:border-[#45c7ff] focus:ring-2 focus:ring-[#45c7ff]/40"
                    />
                  </div>

                  {/* Email (read-only) */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1.5">
                      Email<span className="text-[#ff5c9a]">*</span>
                    </label>
                    <div
                      className="w-full rounded-2xl bg-white/5 bg-gradient-to-br from-slate-900/70 to-slate-950/70 
                      border border-white/15 px-4 py-3 text-gray-200 text-sm"
                    >
                      {profileData.email}
                    </div>
                  </div>

                  {/* Office Contact */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1.5">
                      Office Contact<span className="text-[#ff5c9a]">*</span>
                    </label>
                    <input
                      type="text"
                      name="officeContact"
                      value={formData.officeContact}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white/5 bg-gradient-to-br from-slate-900/70 to-slate-950/70 
                      border border-white/15 px-4 py-3 text-white text-sm placeholder-white/40 
                      outline-none focus:border-[#45c7ff] focus:ring-2 focus:ring-[#45c7ff]/40"
                    />
                  </div>

                  {/* Alternate Mobile */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1.5">
                      Alternate Mobile No.
                    </label>
                    <input
                      type="text"
                      name="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white/5 bg-gradient-to-br from-slate-900/70 to-slate-950/70 
                      border border-white/15 px-4 py-3 text-white text-sm placeholder-white/40 
                      outline-none focus:border-[#45c7ff] focus:ring-2 focus:ring-[#45c7ff]/40"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white/5 bg-gradient-to-br from-slate-900/70 to-slate-950/70 
                      border border-white/15 px-4 py-3 text-white text-sm placeholder-white/40 
                      outline-none focus:border-[#45c7ff] focus:ring-2 focus:ring-[#45c7ff]/40"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1.5">
                      Designation / Job Title
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white/5 bg-gradient-to-br from-slate-900/70 to-slate-950/70 
                      border border-white/15 px-4 py-3 text-white text-sm placeholder-white/40 
                      outline-none focus:border-[#45c7ff] focus:ring-2 focus:ring-[#45c7ff]/40"
                    />
                  </div>
                </div>

                {/* Save Button + message */}
                <div className="pt-2 flex flex-col items-center gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full md:w-[260px] px-12 py-3 rounded-full 
                    bg-gradient-to-r from-[#3bb7ff] via-[#45c7ff] to-[#7b3ae3] 
                    text-sm font-semibold shadow-[0_14px_40px_rgba(69,199,255,0.65)] 
                    hover:brightness-110 hover:-translate-y-[1px] transition disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save details"}
                  </button>

                  {message && (
                    <p className="text-xs text-white/80 text-center">{message}</p>
                  )}
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
