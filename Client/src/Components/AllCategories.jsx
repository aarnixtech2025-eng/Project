// src/Components/AllCategories.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

function AllCategoryCard({ category, onClick }) {
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
      className="
        cursor-pointer group relative flex flex-col
        rounded-[32px]
        bg-white
        px-8 py-7
        border border-slate-100
        shadow-[0_10px_30px_rgba(15,23,42,0.08)]
        hover:shadow-[0_20px_45px_rgba(15,23,42,0.16)]
        hover:-translate-y-1.5
        transition-all duration-200 ease-out
      "
    >
      {/* subtle halo */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50 via-transparent to-sky-50 transition-opacity duration-200" />

      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-24 w-24 rounded-[28px] overflow-hidden bg-slate-100 shadow-sm">
            {category.image ? (
              <img
                src={category.image}
                alt={category.categoryname || "Category"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-3xl text-slate-300">
                📦
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 leading-tight line-clamp-2">
              {category.categoryname}
            </h3>

            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-blue-600 font-semibold">
              Category
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </article>
  );
}

export default function AllCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to load all categories:", err);
        setCategories([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 py-14 sm:py-16 lg:py-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 mb-2">
              Browse
            </div>
            <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-slate-900 tracking-tight">
              All{" "}
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed">
              Explore every category available on the platform and drill down
              into detailed subcategories with a single click.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="
              inline-flex items-center gap-1.5
              rounded-full border border-slate-200
              bg-white px-4 py-1.5
              text-sm font-medium text-slate-600
              shadow-sm
              hover:bg-slate-50
              hover:border-slate-300
              transition
            "
          >
            <span className="text-base">←</span>
            Back
          </button>
        </header>

        {/* Grid */}
        <section
          aria-label="All categories"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
        >
          {categories.map((cat) => {
            const id = cat._id;

            if (!id) {
              console.warn("AllCategories: category missing _id", cat);
              return null;
            }

            return (
              <AllCategoryCard
                key={id}
                category={cat}
                onClick={() => navigate(`/categories/${id}/subcategories`)}
              />
            );
          })}

          {categories.length === 0 && (
            <p className="col-span-full text-center text-slate-500">
              No categories available.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
