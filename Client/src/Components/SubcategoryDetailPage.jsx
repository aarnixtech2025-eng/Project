import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

export default function SubcategoryDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [subcategory, setSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const fallbackName = location.state?.subcategoryName || "Subcategory";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setStatus("loading");

        const subRes = await fetch(`${API_BASE_URL}/subcategories/${id}`);
        if (!subRes.ok) throw new Error("Failed to load subcategory details");
        const subData = await subRes.json();
        setSubcategory(subData);

        const prodRes = await fetch(`${API_BASE_URL}/subcategories/${id}/products`);
        if (!prodRes.ok) throw new Error("Failed to load products");
        const prodData = await prodRes.json();
        setProducts(Array.isArray(prodData) ? prodData : []);

        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    };

    fetchAll();
  }, [id]);

  const handleView = (product) => console.log("View:", product);
  const handleContact = (product) => console.log("Contact Supplier:", product);
  const handleQuote = (product) => console.log("Ask for Quote:", product);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-14 sm:py-16 lg:py-20">
      <main className="w-full px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">
        <header className="mb-10">
          <button onClick={() => navigate(-1)} className="mb-3 inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800">← Back</button>

          <h1 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight text-slate-900">
            {subcategory?.productname || fallbackName}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-3xl">
            {subcategory?.description || "Explore products within this subcategory."}
          </p>
        </header>

        {status === "loading" && <p className="text-slate-500">Loading…</p>}
        {status === "error" && <p className="text-red-500">{error}</p>}

        {status === "success" && (
          <>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Products in this subcategory</h2>

            {products.length === 0 ? (
              <p className="text-slate-500">No products found.</p>
            ) : (
              <div className="space-y-5 sm:space-y-6">
                {products.map((product) => (
                  <article
                    key={product._id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-2xl bg-white shadow-[0_14px_32px_rgba(15,23,42,0.06)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(15,23,42,0.13)] hover:border-emerald-400/70 transition p-4 sm:p-5"
                  >
                    <div className="w-full sm:w-40 md:w-48 flex-shrink-0">
                      <div className="relative h-40 sm:h-32 md:h-40 rounded-xl bg-slate-100 overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No image</div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900">{product.name}</h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-3">{product.description || "No description available."}</p>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <div>
                            <span className="text-[11px] text-slate-400 uppercase tracking-wide">Price</span>
                            <div className="text-sm sm:text-base font-semibold text-slate-900">
                              {product.currency && product.price ? `${product.currency} ${product.price}` : "Contact for price"}
                            </div>
                          </div>

                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${product.inStock ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
                            {product.inStock ? "In stock" : "Out of stock"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                        <button onClick={() => handleView(product)} className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs sm:text-sm">View</button>
                        <button onClick={() => handleContact(product)} className="px-4 py-2 border border-slate-200 text-slate-700 bg-white rounded-full text-xs sm:text-sm">Contact Supplier</button>
                        <button onClick={() => handleQuote(product)} className="px-4 py-2 border border-emerald-200 text-emerald-700 bg-emerald-50 rounded-full text-xs sm:text-sm">Ask for Quote</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
