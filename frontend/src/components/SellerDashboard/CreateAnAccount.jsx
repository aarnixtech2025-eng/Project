import React from "react";
import { Link } from "react-router-dom";

const renderIcon = (type) => {
  switch (type) {
    case "account":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-9 h-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="10" width="32" height="28" rx="4" ry="4" />
          <circle cx="24" cy="21" r="5" />
          <path d="M16 32c2.5-3 5-4.5 8-4.5s5.5 1.5 8 4.5" />
        </svg>
      );
    case "profile":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-9 h-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="16" y="6" width="16" height="36" rx="4" ry="4" />
          <circle cx="24" cy="20" r="4.5" />
          <path d="M19 30c1.9-2.4 3.8-3.6 5-3.6s3.1 1.2 5 3.6" />
          <circle cx="24" cy="10.5" r="1.5" />
        </svg>
      );
    case "products":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-9 h-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 16 24 8l16 8-16 8z" />
          <path d="M8 16v16l16 8 16-8V16" />
          <path d="M24 16v24" />
        </svg>
      );
    case "selling":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-9 h-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="38" r="2.5" />
          <circle cx="32" cy="38" r="2.5" />
          <path d="M10 10h4l3.5 18h17l3-13H18" />
        </svg>
      );
    default:
      return null;
  }
};

const CreateAnAccount = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#0A0F1F] via-[#101A32] to-[#1B0C1F] relative overflow-hidden">
      {/* Glow blob */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF3E6C]/25 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            How to Sell on <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3E6C] via-[#FF8A5C] to-[#FFC857]">TradeIndia</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Register with TradeIndia for free and grow your business exponentially.
            Join our 4.5 million+ seller community and start selling to over 5.8 million
            active buyers on our platform.
          </p>
        </div>

        {/* Manual Cards (NO ARRAY, NO MAP) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- CARD 1 (Clickable) --- */}
          <Link
            to="/CreateAccount"
            aria-label="Create An Account"
            className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FF3E6C] via-[#9F6BFF] to-[#00D4FF] shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.85)] transition-all duration-300"
          >
            <div className="bg-slate-950/70 backdrop-blur-2xl rounded-3xl px-8 py-8 flex flex-col gap-4 h-full transform group-hover:-translate-y-1 group-hover:scale-[1.01] transition-all duration-300">
              <div className="text-[#FF3E6C]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF3E6C] via-[#FF8A5C] to-[#FFC857] flex items-center justify-center shadow-[0_0_30px_rgba(255,62,108,0.6)]">
                  <span className="text-white">{renderIcon("account")}</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg md:text-xl flex items-center gap-2">
                  Create an Account
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FFB4C6] bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                    Step 1
                  </span>
                </h3>
                <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[#FF3E6C] via-[#FF8A5C] to-transparent rounded-full" />
              </div>

              <p className="text-slate-200 text-sm leading-relaxed">
                Create your free seller account in a few easy steps. Visit
                <span className="font-medium text-[#FFB4C6]"> www.tradeindia.com</span>, click on{" "}
                <span className="font-semibold">Join Free</span> and fill in your basic details.
              </p>

              <div className="mt-2 flex items-center gap-2 text-xs text-[#FFD1E0] font-medium">
                <span className="inline-flex h-6 w-6 rounded-full border border-white/10 items-center justify-center text-[11px]">
                  1
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Get started in less than a minute →
                </span>
              </div>
            </div>
          </Link>

          {/* --- CARD 2 --- */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FFC857] via-[#FF8A5C] to-[#9F6BFF] shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
            <div className="bg-slate-950/70 backdrop-blur-2xl rounded-3xl px-8 py-8 flex flex-col gap-4 h-full transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="text-yellow-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFC857] via-[#FFEA7F] to-[#FF8A5C] flex items-center justify-center shadow-[0_0_30px_rgba(255,200,87,0.55)]">
                  <span className="text-slate-900">{renderIcon("profile")}</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg md:text-xl flex items-center gap-2">
                  Update Your Company Profile
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FFF1B0] bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                    Step 2
                  </span>
                </h3>
                <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[#FFC857] via-[#FFEA7F] to-transparent rounded-full" />
              </div>

              <p className="text-slate-200 text-sm leading-relaxed">
                After registration, complete your profile with your company name, GST,
                identity documents and bank details so buyers can trust and verify you quickly.
              </p>

              <ul className="mt-1 text-xs text-slate-300 space-y-1">
                <li>• Build credibility with verified information</li>
                <li>• Improve your visibility in buyer searches</li>
              </ul>
            </div>
          </div>

          {/* --- CARD 3 --- */}
           <Link
            to="/AddProduct"
            aria-label="Create An Account"
            className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FF3E6C] via-[#9F6BFF] to-[#00D4FF] shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.85)] transition-all duration-300"
          >
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#00D4FF] via-[#4F46E5] to-[#9F6BFF] shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
            <div className="bg-slate-950/70 backdrop-blur-2xl rounded-3xl px-8 py-8 flex flex-col gap-4 h-full transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="text-sky-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] via-[#4F46E5] to-[#9F6BFF] flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.6)]">
                  <span className="text-white">{renderIcon("products")}</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg md:text-xl flex items-center gap-2">
                  Add Products
                  <span className="text-xs uppercase tracking-[0.2em] text-sky-100 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                    Step 3
                  </span>
                </h3>
                <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] via-[#4F46E5] to-transparent rounded-full" />
              </div>

              <p className="text-slate-200 text-sm leading-relaxed">
                List your products, write compelling descriptions, upload attractive images,
                set competitive prices and start reaching prospective buyers instantly.
              </p>

              <ul className="mt-1 text-xs text-slate-300 space-y-1">
                <li>• Highlight key features & USPs</li>
                <li>• Showcase clear, high-quality product photos</li>
              </ul>
            </div>
          </div>
        </Link>
          {/* --- CARD 4 --- */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FF3E6C] via-[#FF8A5C] to-[#FFC857] shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
            <div className="bg-slate-950/70 backdrop-blur-2xl rounded-3xl px-8 py-8 flex flex-col gap-4 h-full transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="text-[#FF3E6C]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF3E6C] via-[#FF8A5C] to-[#FFC857] flex items-center justify-center shadow-[0_0_30px_rgba(255,62,108,0.6)]">
                  <span className="text-white">{renderIcon("selling")}</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg md:text-xl flex items-center gap-2">
                  Start Selling
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FFE3BF] bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                    Step 4
                  </span>
                </h3>
                <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[#FF3E6C] via-[#FF8A5C] to-transparent rounded-full" />
              </div>

              <p className="text-slate-200 text-sm leading-relaxed">
                Once you become a verified seller on TradeIndia, you&apos;ll start receiving
                high-intent inquiries from genuine buyers and can manage them from your dashboard.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 border border-white/10">
                  🔔 Real-time buyer inquiries
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 border border-white/10">
                  📊 Track leads & responses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAnAccount;
