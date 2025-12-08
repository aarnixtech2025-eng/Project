import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000"; // adjust if needed

export default function AddProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/categories`);
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedCategoryId) {
      setMessage("Please select a category.");
      return;
    }

    if (!price || !quantity || !unit) {
      setMessage("Price, quantity, and unit are required.");
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat._id === selectedCategoryId
    );

    if (!selectedCategory) {
      setMessage("Invalid category selected.");
      return;
    }

    const body = {
      productname: selectedCategory.categoryname,
      price: String(price),
      quantity: String(quantity),
      unit,
      currency,
      image,
      contact: phone,
    };

    try {
      setLoading(true);

      await axios.post(
        `${API_BASE}/api/categories/${selectedCategoryId}/subcategories`,
        body
      );

      setShowSuccess(true);
      setMessage("");

      // reset
      setPhone("");
      setPrice("");
      setQuantity("");
      setUnit("");
      setImage("");
      setSelectedCategoryId("");
    } catch (err) {
      console.error(err);
      const apiMsg =
        err.response?.data?.message ||
        "Something went wrong while adding the product.";
      setMessage(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSuccess(false)}
          />
          <div className="relative bg-white rounded-xl px-6 py-5 shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Product added
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your product has been added under the selected category.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* PAGE WRAPPER */}
      <div className="min-h-[720px] bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT: INFO PANEL */}
          <div className="text-slate-50 flex flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-8 py-8 shadow-lg">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-indigo-300 mb-10">
                Seller console
              </p>
              <h1 className="text-3xl sm:text-[34px] font-semibold leading-tight">
                Upload your product details
              </h1>
              <p className="mt-3 text-sm text-slate-300 max-w-md">
                Create structured listings for your products under the right
                category so buyers can discover you faster.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
              <StatBox value="10M+" label="registered users" />
              <StatBox value="6M+" label="monthly active users" />
              <StatBox value="120M+" label="inquiries / year" />
              <StatBox value="90k+" label="live categories" />
            </div>

            <p className="mt-8 text-[11px] text-slate-400">
              Tip: Keep pricing and stock updated to appear higher in buyer
              searches.
            </p>
          </div>

          {/* RIGHT: FORM CARD */}
          <div className="flex justify-center">
            <div className="w-full max-w-[520px] rounded-2xl bg-slate-900/95 border border-slate-200 shadow-xl px-7 py-7 md:px-8 md:py-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-50">
                    Add product entry
                  </h2>
                  <p className="text-xs text-slate-400">
                    Fill in the details below to create a listing.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] px-2.5 py-1 border border-emerald-500/30">
                  B2B Listing
                </span>
              </div>

              {message && (
                <div className="mb-3 text-xs rounded-lg bg-red-500/10 border border-red-500/40 text-red-200 px-3 py-2">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                {/* PHONE */}
                <div>
                  <label className="block text-xs font-medium text-slate-200 mb-1.5">
                    Contact number 
                  </label>
                  <div className="flex gap-5">
                    <div className="w-24 flex items-center justify-center rounded-xl bg-slate-800 text-slate-100 text-xs border border-slate-700">
                      <span className="mr-1 text-base">🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Seller mobile number"
                      className="flex-1 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 px-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* CATEGORY DROPDOWN */}
                <div>
                  <label className="block text-xs font-medium text-slate-200 mb-1.5">
                    Product category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700 text-s text-slate-100 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryname}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PRICING ROW */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5">
                      Unit price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 1200"
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 px-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                {/* QUANTITY ROW */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5">
                      Available quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 px-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select unit</option>
                      <option value="kg">Kg</option>
                      <option value="pcs">Pieces</option>
                      <option value="litre">Litre</option>
                      <option value="packet">Packet</option>
                    </select>
                  </div>
                </div>

                {/* IMAGE URL */}
                <div>
                  <label className="block text-xs font-medium text-slate-200 mb-1.5">
                    Primary image URL
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 px-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="mt-1 text-[10px] text-slate-500">
                    Use a clear, front-facing image of the product. You can add
                    more photos later from the product details page.
                  </p>
                </div>

                {/* SUBMIT */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-semibold text-white py-2.5 transition"
                  >
                    {loading ? "Saving…" : "Save product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
      <div className="text-lg font-semibold text-slate-50">{value}</div>
      <div className="text-[11px] text-slate-400">{label}</div>
    </div>
  );
}
