import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeaturedProducts from "./FeaturedProducts";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.categories ?? [];
        setCategories(data);
      })
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div>
      <main className="bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100">
        <section className="max-w-6xl mx-auto px-2 sm:px-3 py-6">

          {/* HEADER + VIEW ALL BUTTON */}
          <div className="mb-1 flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">
                Browse Categories
              </h1>
              <p className="text-slate-500 mt-1">
                Explore products across industries
              </p>
            </div>

            <button
              onClick={() => navigate("/all-categories")} // 🔹 IMPORTANT
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

          {/* CATEGORY SCROLLER */}
          <div className="flex gap-4 overflow-x-auto py-3 scrollbar-hide snap-x snap-mandatory">
            {categories.map((cat) => {
              const id = cat._id ?? cat.id ?? cat.name;
              const image =
                cat.image ?? "https://via.placeholder.com/600x400?text=Image";
              const productCount =
                typeof cat.productCount === "number"
                  ? cat.productCount
                  : cat.subcategories?.length ?? 0;

              return (
                <article
                  key={id}
                  onClick={() => navigate(`/categories/${id}`)}
                  className="
                    snap-start min-w-[230px] sm:min-w-[260px] md:min-w-[280px]
                    rounded-2xl bg-white p-4 shadow border border-slate-100
                    transition hover:shadow-xl hover:-translate-y-1 cursor-pointer
                  "
                >
                  <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100 mb-4">
                    <img
                      src={image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-[15px] font-semibold text-slate-900 mb-1">
                    {cat.name}
                  </h3>

                  <p className="text-[12px] text-slate-500 mb-3">
                    {productCount}{" "}
                    <span className="text-slate-400">products available</span>
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase text-slate-400">
                      View details
                    </span>
                    <div className="h-5 w-5 flex items-center justify-center border border-slate-200 rounded-full bg-slate-50">
                      →
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <FeaturedProducts />
    </div>
  );
}
