// src/components/FeaturedProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PLACEHOLDER = "https://via.placeholder.com/800x600?text=No+Image";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        if (!mounted) return;
        setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-slate-600 text-lg">Loading featured products…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Featured Product
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Handpicked quality from verified sellers
            </p>
          </div>
          <button
            onClick={() => navigate("/all-categories")}
            className="
                flex items-center gap-2
                bg-black text-white
                px-4 py-1.5 rounded-full
                font-medium text-xs
                shadow hover:bg-slate-800 transition
              "
          >
            View All
            <span
              className="
                  h-6 w-6 flex items-center justify-center
                  bg-white text-black rounded-full
                  text-sm leading-none
                "
            >
              →
            </span>
          </button>
        </div>

        {/* ⭐ HORIZONTAL SCROLL — SCROLLBAR HIDDEN ⭐ */}
        <div
          className="
            flex gap-6 
            overflow-x-auto 
            overflow-y-hidden 
            scrollbar-hide
            pb-4 pt-2
            snap-x snap-mandatory
          "
        >
          {products.map((p) => (
            <article
              key={p._id ?? p.id ?? p.name}
              className="
                snap-start
                w-[250px]
                bg-white rounded-2xl border border-slate-200 shadow-sm
                flex-shrink-0
                flex flex-col
                h-[350px]
              "
            >
              {/* IMAGE */}
              <div className="p-4 pb-2">
                <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={p.image?.trim() ? p.image : PLACEHOLDER}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="px-4 flex flex-col flex-grow justify-between pb-4">
                <div>
                  {/* NAME + PRICE */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 leading-tight w-[60%]">
                      {p.name}
                    </h3>

                    <div className="text-right leading-tight">
                      <div className="text-base font-semibold text-slate-900">
                        ₹{Number(p.price).toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        /{p.unit ?? "Unit"}
                      </div>
                    </div>
                  </div>

                  {/* RATING */}
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-sm text-slate-600">
                      {p.rating ?? "—"}
                    </span>
                    <span className="text-amber-400 text-lg leading-none">★</span>
                  </div>
                </div>

                {/* BUTTONS — ALWAYS ALIGNED */}
                <div className="mt-4 flex items-center gap-2">

                  {/* 🔵 BLUE SEND ENQUIRY BUTTON */}
                  <button
                    onClick={() =>
                      (window.location.href = `/enquiry-form`)
                    }
                    className="
                      flex-1 rounded-full 
                      px-4 py-2 
                      text-sm font-medium 
                      text-white 
                      bg-blue-600 
                      hover:bg-blue-700 
                      shadow 
                      transition
                    "
                  >
                    Send Enquiry
                  </button>

                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase text-slate-400">
                      View details
                    </span>
                    <div className="h-5 w-5 flex items-center justify-center border border-slate-200 rounded-full bg-slate-50">
                      →
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
