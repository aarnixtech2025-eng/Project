// src/components/FeaturedProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ⬅️ add this

const PLACEHOLDER = "https://via.placeholder.com/800x600?text=No+Image";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ⬅️ hook

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to load featured products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center text-slate-600 text-lg">
        Loading featured products…
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center text-red-600 text-lg">{error}</div>
    );

  return (
    <section className="mt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* ⭐ CENTERED HEADER ⭐ */}
        <header className="text-center mb-12">
          <h2
            className="
              text-3xl sm:text-4xl font-bold 
              bg-gradient-to-r from-blue-600 to-sky-500 
              bg-clip-text text-transparent
            "
          >
            Featured Products
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Discover our handpicked selection of premium industrial equipment
          </p>
        </header>

        {/* ⭐ GRID LAYOUT (4 × 2 same as categories) ⭐ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <article
              key={p._id}
              className="
                bg-white rounded-3xl border border-slate-200 
                shadow-[0_10px_25px_rgba(0,0,0,0.06)]
                hover:shadow-[0_16px_35px_rgba(0,0,0,0.10)]
                hover:-translate-y-1.5 
                transition-all duration-200
                overflow-hidden
              "
            >
              {/* IMAGE */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={p.image || PLACEHOLDER}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col h-[160px] justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 leading-tight">
                    {p.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-amber-400 text-sm">
                    ★{" "}
                    <span className="text-slate-600 ml-1">
                      {p.rating ?? "—"}
                    </span>
                  </div>

                  <div className="mt-2 text-slate-900 font-semibold">
                    ₹{Number(p.price).toLocaleString()}
                  </div>
                </div>

                <button
            onClick={() => navigate("/enquiry-form")} // ⬅️ navigate here
                  className="
                    mt-4 w-full bg-blue-600 hover:bg-blue-700
                    text-white py-2 rounded-full text-sm
                    font-medium transition
                  "
                >
                  Enquire
                </button>
              </div>
            </article>
          ))}

          {products.length === 0 && (
            <p className="col-span-full text-center text-slate-500">
              No featured products available.
            </p>
          )}
        </div>

        {/* ⭐ VIEW MORE BUTTON - navigates to full-page grid ⭐ */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/featured-products")} // ⬅️ navigate here
            className="
              inline-flex items-center gap-1.5
              rounded-full
              bg-white
              px-6 py-2.5
              text-sm font-medium
              text-sky-600
              shadow
              hover:bg-sky-50
              transition
            "
          >
            View more
            <span className="text-xs">▾</span>
          </button>
        </div>
      </div>
    </section>
  );
}
