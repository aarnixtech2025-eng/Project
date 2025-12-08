// src/Components/CategoryPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";

const API_BASE_URL = "http://localhost:5000/api";
const MAX_VISIBLE = 8;

function CategoryCard({ category, onClick }) {
  const subtitle = useMemo(() => {
    return (
      category.subtitle ||
      category.description ||
      category.tagline ||
      "Industrial equipment"
    );
  }, [category]);

  return (
    <article
      onClick={onClick}
      className="cursor-pointer group relative flex flex-col rounded-[32px] bg-white px-8 py-7 shadow border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="h-24 w-24 rounded-3xl bg-slate-100 overflow-hidden">
          {category.image ? (
            <img
              src={category.image}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl text-slate-400">📦</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
            {category.categoryname}
          </h3>

          <p className="mt-1 text-xs uppercase tracking-wider text-blue-500/80">
            Category
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-500 line-clamp-3">{subtitle}</p>
    </article>
  );
}

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        setCategories(data);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError("Failed to load categories");
      }
    };
    load();
  }, []);

  const visible = categories.slice(0, MAX_VISIBLE);

  return (
    <div className="min-h-screen bg-gray-50 py-14">
      <main className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-slate-900 mb-10 text-center">
          Explore <span className="text-blue-600">Top Categories</span>
        </h1>

        {status === "loading" && <p>Loading…</p>}
        {status === "error" && <p className="text-red-500">{error}</p>}

        {status === "success" && (
          <>
            {/* 8-category grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {visible.map((category) => {
                const id =
                  category._id ||
                  category.id ||
                  category.category_id ||
                  category.categoryId;

                return (
                  <CategoryCard
                    key={id}
                    category={category}
                    onClick={() =>
                      navigate(`/categories/${id}/subcategories`)
                    }
                  />
                );
              })}
            </div>

            {/* VIEW MORE BUTTON */}
            {categories.length > MAX_VISIBLE && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => navigate("/all-categories")}
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
            )}
          </>
        )}

        {/* spacing before FeaturedProducts */}
        <div className="mt-20">
          <FeaturedProducts />
        </div>
      </main>
    </div>
  );
}
