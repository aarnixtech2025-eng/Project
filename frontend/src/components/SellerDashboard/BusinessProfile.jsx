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

export default function BusinessProfile() {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    faxNumber: "",
    officeContactCode: "+91",
    officeContactNumber: "",
    ownershipType: "",
    currency: "INR",
    annualTurnover: "",
    yearOfEstablishment: "",
    numberOfEmployees: "",
    address: "",
    pincode: "",
    city: "",
    state: "Maharashtra",
    country: "India",
    gstNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    iecNumber: "",
    tanNumber: "",
    vatNumber: "",
  });

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
<SellerNavbar/>
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

  const inputBase =
    "w-full rounded-2xl bg-[#050817]/70 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/35 outline-none focus:border-[#8b5cff] focus:ring-2 focus:ring-[#8b5cff]/40 transition";

  const fileInputBase =
    "w-full rounded-2xl bg-[#050817]/70 border border-white/15 px-3 py-2 text-xs text-white/80 file:mr-3 file:rounded-xl file:border-none file:bg-white/10 file:px-3 file:py-1.5 file:text-[11px] file:uppercase file:tracking-[0.14em] file:text-white/80 cursor-pointer";

  const labelBase =
    "block text-[11px] tracking-[0.2em] uppercase text-white/60 mb-1.5";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/business-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user._id, // if your user object has _id
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Save failed:", errorData);
        alert("Failed to save business profile.");
        return;
      }

      alert("Business profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Something went wrong while saving.");
    }
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

          {/* NAVIGATION */}
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

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-white/5 text-xs text-gray-400">
            © {new Date().getFullYear()} trade indis.
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-6 lg:py-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* PAGE TITLE */}
            <div className="mb-6 lg:mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-1">
                Seller Portal
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold">
                Business Profile
              </h1>
            </div>

            {/* PROFILE HEADER */}
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

            {/* BUSINESS DETAILS CARD */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[32px] bg-[#050818]/80 border border-white/12 backdrop-blur-3xl px-4 sm:px-6 lg:px-10 py-5 sm:py-6 shadow-[0_22px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Tabs */}
              <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">
                <button
                  type="button"
                  className="px-4 py-2 text-xs sm:text-sm rounded-full bg-white/10 border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                >
                  Business Details
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs sm:text-sm rounded-full text-white/60 hover:text-white hover:bg-white/5 transition"
                >
                  Additional Details
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs sm:text-sm rounded-full text-white/60 hover:text-white hover:bg-white/5 transition"
                >
                  Certification &amp; Award
                </button>
              </div>

              {/* ===================== COMPANY DETAILS ===================== */}
              <div className="mb-6 rounded-2xl bg-white/3 border border-white/10 px-4 sm:px-5 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-100">
                    Company Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Company Name */}
                  <div>
                    <label className={labelBase}>
                      Company Name
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <input
                      name="companyName"
                      type="text"
                      className={inputBase}
                      placeholder="Enter registered company name"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* FAX */}
                  <div>
                    <label className={labelBase}>FAX Number</label>
                    <input
                      name="faxNumber"
                      type="text"
                      className={inputBase}
                      placeholder="Enter FAX number (optional)"
                      value={formData.faxNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Office Contact */}
                  <div>
                    <label className={labelBase}>
                      Office Contact
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="officeContactCode"
                        className={`${inputBase} max-w-[110px]`}
                        value={formData.officeContactCode}
                        onChange={handleChange}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                      <input
                        name="officeContactNumber"
                        type="text"
                        className={inputBase}
                        placeholder="Enter office contact number"
                        value={formData.officeContactNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Ownership Type */}
                  <div>
                    <label className={labelBase}>
                      Ownership Type
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <select
                      name="ownershipType"
                      className={inputBase}
                      value={formData.ownershipType}
                      onChange={handleChange}
                    >
                      <option value="">Select type</option>
                      <option>Private Limited</option>
                      <option>Proprietorship</option>
                      <option>Partnership</option>
                      <option>LLP</option>
                    </select>
                  </div>

                  {/* Currency + Annual Turnover */}
                  <div className="md:col-span-2 grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className={labelBase}>Currency</label>
                      <select
                        name="currency"
                        className={inputBase}
                        value={formData.currency}
                        onChange={handleChange}
                      >
                        <option>INR</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className={labelBase}>
                        Annual Turnover
                        <span className="text-pink-400 ml-1">*</span>
                      </label>
                      <select
                        name="annualTurnover"
                        className={inputBase}
                        value={formData.annualTurnover}
                        onChange={handleChange}
                      >
                        <option value="">Select range</option>
                        <option>1 – 10 Lakh</option>
                        <option>10 – 50 Lakh</option>
                        <option>50 Lakh – 1 Crore</option>
                        <option>1 – 5 Crore</option>
                      </select>
                    </div>
                  </div>

                  {/* Year of Establishment */}
                  <div>
                    <label className={labelBase}>
                      Year of Establishment
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <input
                      name="yearOfEstablishment"
                      type="number"
                      className={inputBase}
                      placeholder="e.g. 2018"
                      value={formData.yearOfEstablishment}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Employees */}
                  <div>
                    <label className={labelBase}>
                      Number of Employees
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <input
                      name="numberOfEmployees"
                      type="number"
                      className={inputBase}
                      placeholder="Total employees in organization"
                      value={formData.numberOfEmployees}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* ===================== ADDRESS DETAILS ===================== */}
              <div className="mb-6 rounded-2xl bg-white/3 border border-white/10 px-4 sm:px-5 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-100">
                    Address Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className={labelBase}>
                      Address
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <input
                      name="address"
                      type="text"
                      className={inputBase}
                      placeholder="Street, area, landmark"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className={labelBase}>
                      Pincode
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <input
                      name="pincode"
                      type="number"
                      className={inputBase}
                      placeholder="Enter 6-digit pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className={labelBase}>
                      City
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <select
                      name="city"
                      className={inputBase}
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="">Select city</option>
                      <option>Buldana</option>
                      <option>Pune</option>
                      <option>Mumbai</option>
                      <option>Nashik</option>
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className={labelBase}>
                      State
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <input
                      name="state"
                      type="text"
                      className={`${inputBase} bg-[#050817]/60`}
                      value={formData.state}
                      readOnly
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className={labelBase}>
                      Country
                      <span className="text-pink-400 ml-1">*</span>
                    </label>
                    <input
                      name="country"
                      type="text"
                      className={`${inputBase} bg-[#050817]/60`}
                      value={formData.country}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* ===================== TAXATION DETAILS ===================== */}
              <div className="mb-6 rounded-2xl bg-white/3 border border-white/10 px-4 sm:px-5 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-100">
                    Taxation Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* GST */}
                  <div>
                    <label className={labelBase}>GST Number</label>
                    <input
                      name="gstNumber"
                      type="text"
                      className={inputBase}
                      placeholder="Enter GST number"
                      value={formData.gstNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* GST Upload */}
                  <div>
                    <label className={labelBase}>Upload GST Document</label>
                    <input type="file" className={fileInputBase} />
                  </div>

                  {/* Aadhaar */}
                  <div>
                    <label className={labelBase}>Aadhaar Number</label>
                    <input
                      name="aadhaarNumber"
                      type="text"
                      className={inputBase}
                      placeholder="Enter Aadhaar number"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Aadhaar Upload */}
                  <div>
                    <label className={labelBase}>Upload Aadhaar Document</label>
                    <input type="file" className={fileInputBase} />
                  </div>

                  {/* PAN */}
                  <div>
                    <label className={labelBase}>PAN Number</label>
                    <input
                      name="panNumber"
                      type="text"
                      className={inputBase}
                      placeholder="Enter PAN number"
                      value={formData.panNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* PAN Upload */}
                  <div>
                    <label className={labelBase}>Upload PAN Document</label>
                    <input type="file" className={fileInputBase} />
                  </div>

                  {/* IEC */}
                  <div>
                    <label className={labelBase}>IEC Number</label>
                    <input
                      name="iecNumber"
                      type="text"
                      className={inputBase}
                      placeholder="Enter IEC number"
                      value={formData.iecNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* IEC Upload */}
                  <div>
                    <label className={labelBase}>Upload IEC Document</label>
                    <input type="file" className={fileInputBase} />
                  </div>

                  {/* TAN */}
                  <div>
                    <label className={labelBase}>TAN Number</label>
                    <input
                      name="tanNumber"
                      type="text"
                      className={inputBase}
                      placeholder="Enter TAN number"
                      value={formData.tanNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* VAT */}
                  <div>
                    <label className={labelBase}>VAT Number</label>
                    <input
                      name="vatNumber"
                      type="text"
                      className={inputBase}
                      placeholder="Enter VAT number (if applicable)"
                      value={formData.vatNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="w-full md:w-[260px] px-12 py-3 rounded-full bg-gradient-to-r from-[#a441ff] via-[#7b3ae3] to-[#4b63ff] text-sm font-semibold shadow-[0_14px_40px_rgba(92,50,255,0.7)] hover:brightness-110 hover:-translate-y-[1px] transition"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
