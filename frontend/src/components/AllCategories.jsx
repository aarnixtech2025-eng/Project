import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllCategories() {
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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-sm text-slate-500">Loading categories...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-sm text-red-600">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">

        {/* HEADER ROW: back + title */}
        <div className="flex items-center justify-center relative mb-6 sm:mb-8">
          {/* Back button on left */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition"
          >
            <span className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm">
              ←
            </span>
            Back
          </button>

          {/* Title – adjusted sizes & line-height */}
          <h1
            className="
              text-2xl sm:text-3xl lg:text-4xl
              font-extrabold tracking-tight
              leading-tight
              bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400
              bg-clip-text text-transparent
            "
          >
            Explore Product Categories
          </h1>
        </div>

        {/* Subtitle + count */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse through all our curated product categories designed to help you
            quickly find the solutions you need.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-slate-800">
              {categories.length} Categories
            </span>
          </div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12 lg:gap-14">
          {categories.map((cat) => {
            const id = cat._id ?? cat.id ?? cat.name;
            const image =
              cat.image ??
              "https://via.placeholder.com/600x400?text=Category+Image";

            return (
              <button
                key={id}
                onClick={() => navigate(`/categories/${id}`)}
                className="
                  group text-left bg-white rounded-3xl
                  border border-slate-200 shadow-sm hover:shadow-xl
                  hover:-translate-y-1 hover:border-blue-400/70
                  transition overflow-hidden
                "
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-slate-900" />
                </div>

                {/* Name */}
                <div className="px-5 py-5 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900 truncate">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-500 group-hover:bg-blue-50 group-hover:border-blue-400 group-hover:text-blue-600 transition">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
