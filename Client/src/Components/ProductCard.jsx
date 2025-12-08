// ProductCard.jsx
import React from "react";

const ProductCard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fb]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Image section */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-[#f5f5f5] p-10">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
            alt="Performax Shoes"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Details section */}
        <div className="md:w-1/2 w-full p-8 md:p-10 flex flex-col justify-between">
          {/* Title + subtitle */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide">PERFORMAX</h1>
            <p className="text-sm text-gray-500 mt-1">
              Boys Low-Top Lace-Up Shoes
            </p>

            {/* Rating */}
            <div className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              <span>3.9★</span>
              <span className="text-[11px] opacity-90">(177 Ratings)</span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#f37021]">₹866</span>
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <span className="line-through">MRP ₹1,155</span>
                <span className="text-xs font-semibold text-[#8c8c8c]">
                  (25% OFF)
                </span>
              </div>
            </div>

            {/* Color */}
            <div className="mt-6">
              <p className="text-sm font-semibold">Select Color</p>
              <p className="text-sm text-gray-700 mt-1">Black</p>
            </div>

            {/* Size */}
            <div className="mt-6">
              <p className="text-sm font-semibold">Select Size (UNI)</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {["9-10Y", "10-11Y", "11-12Y", "12-13Y"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:border-gray-500 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to bag button */}
          <div className="mt-8">
            <button className="w-full py-3 rounded-full bg-[#c68a18] text-white text-sm font-semibold tracking-wide hover:bg-[#b47a12] transition">
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
