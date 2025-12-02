import React, { useState } from "react";

export default function searchbar({ onSearch }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    const trimmed = q.trim();
    onSearch && onSearch(trimmed);
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-4">
      {/* glass-style input */}
      <div className="flex items-center bg-white/95 text-gray-700 rounded-full px-4 py-3 w-full max-w-2xl shadow-lg ring-1 ring-black/6 backdrop-blur">
        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"></path>
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search product, suppliers"
          className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-sm"
        />
      </div>

      {/* pill button with subtle gradient */}
      <button
        type="submit"
        className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-[#2b6df6] to-[#1b3eea] text-white font-semibold shadow-lg transform transition hover:scale-105"
      >
        Search
      </button>
    </form>
  );
}
