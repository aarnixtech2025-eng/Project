// src/pages/AllFeaturedProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PLACEHOLDER = "https://via.placeholder.com/800x600?text=No+Image";

export default function AllFeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center text-slate-600 text-lg">
        Loading products…
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center text-red-600 text-lg">{error}</div>
    );

  return (
    <section className="py-16 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            All Featured Products
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Browse the complete list of featured products available on our
            platform.
          </p>
        </header>

        {/* GRID – same style */}
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
                  className="h-full w-full object-cover transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col h-[170px] justify-between">
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

                  <p className="mt-2 text-slate-900 font-semibold">
                    ₹{Number(p.price).toLocaleString()}
                  </p>
                </div>

                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm font-medium transition">
                  Enquire
                </button>
              </div>
            </article>
          ))}

          {products.length === 0 && (
            <p className="col-span-full text-center text-slate-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
