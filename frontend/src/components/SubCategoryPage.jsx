import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryMeta, setCategoryMeta] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/categories/${id}/subcategories`)
      .then((res) => {
        if (!mounted) return;
        const subs = Array.isArray(res.data)
          ? res.data
          : res.data.subcategories ?? res.data;
        setSubcategories(subs || []);
      })
      .catch(() => mounted && setError("Failed to load subcategories"));

    axios
      .get(`http://localhost:5000/api/categories/${id}`)
      .then((res) => {
        if (!mounted) return;
        const cat = res.data.category ?? res.data;
        setCategoryMeta({
          name: cat.name,
          image: cat.image || "",
          productCount:
            typeof cat.productCount === "number"
              ? cat.productCount
              : (cat.subcategories?.length ?? 0),
        });
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 text-center">{error}</div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/categories")}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm mb-6"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200">
            ←
          </span>
          Back
        </button>

        {/* CATEGORY HEADER */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-28 h-20 rounded-xl bg-white border border-slate-200 shadow flex items-center justify-center overflow-hidden">
            <img
              src={
                categoryMeta?.image ||
                "https://via.placeholder.com/200x120?text=Category"
              }
              alt="Category"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {categoryMeta?.name}
            </h1>
            <p className="text-slate-500 mt-1">
              {(categoryMeta?.productCount ?? subcategories.length).toLocaleString()} Products •{" "}
              {subcategories.length} Subcategories
            </p>
          </div>
        </div>

        {/* GRID OF CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {subcategories.map((s) => (
            <div key={s._id ?? s.name} className="flex flex-col items-center">

              {/* ⭐ FIXED CARD SIZE + IMAGE FITS COMPLETELY */}
              <div
                className="
                  w-full 
                  h-44           /* consistent height */
                  bg-white 
                  border border-slate-200 
                  rounded-2xl 
                  shadow-sm 
                  overflow-hidden 
                  flex items-center justify-center 
                  transition-all duration-200
                  hover:shadow-md hover:-translate-y-1 hover:border-blue-300
                "
              >
                <img
                  src={
                    s.image ||
                    "https://via.placeholder.com/400x300?text=Subcategory"
                  }
                  alt={s.name}
                  className="
                    max-w-full 
                    max-h-full 
                    object-contain   /* ⭐ IMAGE FITS COMPLETELY */
                  "
                />
              </div>

              {/* NAME BELOW CARD */}
              <div className="mt-3 text-center w-full">
                <div className="text-base font-semibold text-slate-900 truncate">
                  {s.name}
                </div>

                <span className="inline-flex items-center mt-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                  {(s.productCount ?? 0).toLocaleString()} items
                </span>
              </div>

            </div>
          ))}
        </div>

        {subcategories.length === 0 && (
          <div className="text-slate-500 mt-4">No subcategories available.</div>
        )}

      </div>
    </section>
  );
}
