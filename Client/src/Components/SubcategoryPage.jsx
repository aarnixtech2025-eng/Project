// src/Components/SubcategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

export default function SubcategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || id === "undefined") {
      setStatus("error");
      setError("Invalid category ID in URL.");
      return;
    }

    const fetchSubcategories = async () => {
      try {
        setStatus("loading");
        const res = await fetch(`${API_BASE_URL}/categories/${id}/subcategories`);
        if (!res.ok) throw new Error("Failed to fetch subcategories");
        const data = await res.json();
        setSubcategories(Array.isArray(data) ? data : []);
        setStatus("success");
      } catch (err) {
        setError(err.message || "Failed to load subcategories");
        setStatus("error");
      }
    };

    fetchSubcategories();
  }, [id]);

  const handleSubcategoryClick = (sub) => {
    navigate(`/subcategories/${sub._id}`, { state: { subcategoryName: sub.productname } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-14 sm:py-16 lg:py-20">
      <main className="w-full px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button onClick={() => navigate(-1)} className="mb-3 inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800">← Back</button>
            <h1 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight text-slate-900">Subcategories</h1>
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl">Browse specialized subcategories to find exactly what your business needs.</p>
          </div>
        </header>

        {status === "loading" && <p className="text-center text-slate-500">Loading subcategories…</p>}
        {status === "error" && <p className="text-center text-red-500">{error}</p>}

        {status === "success" && (
          <>
            {subcategories.length === 0 ? (
              <p className="text-center text-slate-500">No subcategories found for this category.</p>
            ) : (
              <section className="grid gap-6 sm:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {subcategories.map((sub) => (
                  <article
                    key={sub._id}
                    onClick={() => handleSubcategoryClick(sub)}
                    className="group relative flex flex-col rounded-[28px] bg-white px-6 py-6 shadow-[0_14px_32px_rgba(15,23,42,0.06)] border border-slate-100 hover:border-blue-400/60 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition cursor-pointer"
                  >
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug line-clamp-2">{sub.productname}</h2>

                    <p className="mt-3 text-sm text-slate-500 line-clamp-3">
                      {sub.description || "High quality products in this subcategory."}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wide text-slate-400">
                        {sub.quantity && sub.unit ? `${sub.quantity} ${sub.unit}` : "Subcategory"}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {sub.currency && sub.price ? `${sub.currency} ${sub.price}` : ""}
                      </span>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
