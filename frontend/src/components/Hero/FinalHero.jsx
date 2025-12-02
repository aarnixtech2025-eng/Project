import React, { useEffect, useState } from "react";
import SearchBar from "../Searchbar/searchbar";
import CategoryPage from "../CategoryPage";
import FeaturedProducts from "../FeaturedProducts";
import WhyChooseUs from "../WhyChooseUs";

export default function Hero() {
  const [results, setResults] = useState([]);
  const [counts, setCounts] = useState({
    products: 0,
    sellers: 0,
    buyers: 0,
    categories: 0,
  });

  const targets = { products: 50000, sellers: 10000, buyers: 100000, categories: 50 };

  useEffect(() => {
    let rafId;
    const start = performance.now();
    const duration = 1300;

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      setCounts({
        products: Math.floor(targets.products * t),
        sellers: Math.floor(targets.sellers * t),
        buyers: Math.floor(targets.buyers * t),
        categories: Math.floor(targets.categories * t),
      });
      if (t < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line
  }, []);

  const handleSearch = (q) => {
    setResults(q ? [{ id: 1, title: `Result for "${q}"` }] : []);
  };
// ------------------- User Count -------------------
    const [userCount, setUserCount] = useState(0);
  
    useEffect(() => {
      const fetchCount = () => {
        fetch("http://localhost:5000/api/user-count")
          .then((res) => res.json())
          .then((data) => setUserCount(data.count)
  )
          .catch((err) => console.log("User Count Error:", err));
      };
  
      fetchCount();
      const interval = setInterval(fetchCount, 5000);
      return () => clearInterval(interval);
    }, []);
  return (
    <div >
      {/* HERO SECTION (Screenshot Accurate) */}
      <section className="bg-[#0D0F11] text-white pt-15 pb-20">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT CONTENT */}
            <div className="max-w-2xl">
              {/* BLUE PILL BADGE */}
              <div className="inline-block bg-[#D7E2FF] text-[#1B1F2B] text-xs font-semibold px-4 py-1 rounded-full mb-6">
                India's Fastest Growing B2B Digital Marketplace
              </div>

              {/* MAIN HEADING */}
              <h1 className=" sm:text-5xl lg:text-[50px] font-extrabold leading-tight">
                A Secure Platform for <br />
                Verified Sellers + <br />
                Genuine Buyers
              </h1>

              <p className="text-gray-300 mt-4 text-sm">
                AI Based Matching Engine (Buyer Requirement → Seller Recommendation)
              </p>

              {/* Search Bar */}
              <div className="mt-8">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* RESULTS */}
              {results.length > 0 && (
                <div className="bg-white text-black rounded-lg mt-4 p-4 max-w-xl shadow">
                  <strong className="block mb-2">Results</strong>
                  <ul>
                    {results.map((r) => (
                      <li key={r.id} className="py-1 border-b last:border-b-0">{r.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end mt-5">
              <div className="w-full max-w-[430px] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/assets/hero1.png"
                  alt="Business handshake"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION (Clean Like Screenshot) */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">

            <StatCard label="Products" value={counts.products} raw={targets.products} />
            <StatCard label="Verified Sellers" value={counts.sellers} raw={targets.sellers} />
            <StatCard label="Active Buyers" value={counts.buyers} raw={targets.buyers}  />
            <StatCard label="Categories" value={counts.categories} raw={targets.categories} />

          </div>
        </div>
      </section>
      <CategoryPage/>
      <WhyChooseUs/>
      <footer/>
    </div>
  );
}

function StatCard({ label, value, raw }) {
  let display;
  if (raw >= 100000) display = "1Lakh+";
  else if (raw >= 1000) display = `${Math.floor(value / 1000)}K`;
  else display = value;

  return (
    <div>
      <div className="text-3xl font-extrabold">{display}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
    
  );
}
