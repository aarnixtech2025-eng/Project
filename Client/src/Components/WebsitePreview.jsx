import React, { useState } from "react";

export default function WebsitePreview({ company, theme }) {
  const [activeSection, setActiveSection] = useState("home");

  const hasServices = company.services?.some((s) => s && s.trim());
  const hasProducts = company.products?.some((p) => p.name || p.description);

  const sectionButtons = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <section className="bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-md flex flex-col min-h-[calc(100vh-120px)]">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-10 h-10 rounded-full object-contain bg-white border border-slate-200"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: theme.primary }}
            >
              {company.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div>
            <div className="text-lg font-semibold">
              {company.name || "Your Company Name"}
            </div>
            <div className="text-xs text-slate-500">
              {company.tagline || "Your company tagline will appear here."}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm">
          {sectionButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveSection(btn.id)}
              className={`px-3 py-1 rounded-full border text-sm ${
                activeSection === btn.id
                  ? "text-white"
                  : "text-slate-700 bg-white"
              }`}
              style={
                activeSection === btn.id
                  ? { background: theme.primary, borderColor: theme.primary }
                  : { borderColor: "#e5e7eb" }
              }
            >
              {btn.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="flex md:hidden gap-2 px-4 py-2 border-b border-slate-200 bg-slate-50">
        {sectionButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveSection(btn.id)}
            className={`flex-1 px-2 py-1 rounded-full border text-xs ${
              activeSection === btn.id
                ? "text-white"
                : "text-slate-700 bg-white"
            }`}
            style={
              activeSection === btn.id
                ? { background: theme.primary, borderColor: theme.primary }
                : { borderColor: "#e5e7eb" }
            }
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {activeSection === "home" && (
          <HomeSection company={company} theme={theme} hasServices={hasServices} hasProducts={hasProducts} />
        )}

        {activeSection === "about" && (
          <AboutSection company={company} theme={theme} />
        )}

        {activeSection === "products" && (
          <ProductsSection company={company} theme={theme} />
        )}

        {activeSection === "contact" && (
          <ContactSection company={company} theme={theme} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-1">
        <span>
          © {new Date().getFullYear()} {company.name || "Your Company"}. All
          rights reserved.
        </span>
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {company.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </footer>
    </section>
  );
}

/* --------- Sections ---------- */

function HomeSection({ company, theme, hasServices, hasProducts }) {
  return (
    <div>
      {/* HERO */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        {company.heroImage && (
          <img
            src={company.heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/90 to-white/95" />
        <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 px-6">
          <div className="max-w-xl space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {company.tagline ||
                "We help you build modern digital experiences."}
            </h1>
            <p className="text-base text-slate-700">
              {company.about ||
                "Explain what your company does – your services, your value, your mission – in a clear sentence or two."}
            </p>
            <div className="flex gap-3 pt-1">
              <button
                className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow"
                style={{ background: theme.primary }}
              >
                Get in touch
              </button>
              {hasProducts && (
                <button className="px-4 py-2 rounded-full text-sm border border-slate-300 bg-white text-slate-700">
                  View products
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:flex w-56 h-40 rounded-2xl border border-slate-200 bg-slate-50 items-center justify-center text-xs text-slate-500">
            Hero illustration / image
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div className="px-6 py-6 grid md:grid-cols-3 gap-4 bg-white">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">
            What we do
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {company.services && company.services.length > 0
              ? "We offer " + company.services.length + " core services for your business."
              : "Add your services in the editor to show them here."}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">
            Our Products
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {company.products && company.products.length > 0
              ? "We currently showcase " + company.products.length + " product(s)."
              : "Add products to display them in the Products page."}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">
            Contact us
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Reach us at{" "}
            <span className="font-semibold">{company.email || "your email"}</span>{" "}
            or call{" "}
            <span className="font-semibold">{company.phone || "your phone"}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ company, theme }) {
  return (
    <div className="px-6 py-6 space-y-4 bg-white">
      <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: theme.primary }}
        >
          A
        </span>
        About {company.name || "the Company"}
      </h2>
      <p className="text-base text-slate-700 whitespace-pre-line">
        {company.about ||
          "Write about your company here: mission, history, team, and what makes you unique."}
      </p>
      <div className="mt-2 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">
            Our Mission
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Use this section to explain what you aim to achieve for your customers.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">
            Why Choose Us
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Highlight your strengths – quality, support, expertise, innovation.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductsSection({ company, theme }) {
  const products = company.products?.filter((p) => p.name || p.description) || [];

  return (
    <div className="px-6 py-6 bg-white">
      <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-2">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: theme.primary }}
        >
          P
        </span>
        Products
      </h2>
      {products.length === 0 ? (
        <p className="text-base text-slate-600">
          No products added yet. Add products in the editor panel to show them
          here.
        </p>
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3">
            These products are generated from the data you entered.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <div className="w-full h-32 bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                    Product image
                  </div>
                )}
                <div className="p-3 flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900 truncate">
                      {p.name || "Product name"}
                    </h3>
                    {(p.price || p.currency) && (
                      <span
                        className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                        style={{ background: theme.secondary }}
                      >
                        {p.price} {p.currency}
                      </span>
                    )}
                  </div>
                  {p.category && (
                    <span className="inline-flex text-xs px-2 py-0.5 rounded-full border border-slate-300 text-slate-700 bg-white w-fit">
                      {p.category}
                    </span>
                  )}
                  <p className="text-sm text-slate-600 mt-1">
                    {p.description || "Short description of this product."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ContactSection({ company, theme }) {
  return (
    <div className="px-6 py-6 space-y-4 bg-white">
      <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: theme.primary }}
        >
          C
        </span>
        Contact & Legal Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">
            Contact Information
          </h3>
          {company.address && (
            <p className="text-slate-700">
              <span className="font-medium">Address: </span>
              {company.address}
            </p>
          )}
          {company.phone && (
            <p className="text-slate-700">
              <span className="font-medium">Phone: </span>
              {company.phone}
            </p>
          )}
          {company.email && (
            <p className="text-slate-700">
              <span className="font-medium">Email: </span>
              {company.email}
            </p>
          )}
          {company.website && (
            <p className="text-slate-700">
              <span className="font-medium">Website: </span>
              {company.website}
            </p>
          )}
        </div>

        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">
            GST & Legal
          </h3>
          {company.gst ? (
            <p className="text-slate-700">
              <span className="font-medium">GST Number: </span>
              {company.gst}
            </p>
          ) : (
            <p className="text-slate-500 text-sm">
              Add GST number in the editor to show it here.
            </p>
          )}
          <p className="text-xs text-slate-500 mt-2">
            You can extend this section to show CIN, PAN, registration details,
            terms & conditions, etc.
          </p>
        </div>
      </div>

      {/* Simple contact form UI */}
      <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          Send us a message
        </h3>
        <form className="grid md:grid-cols-2 gap-3 text-sm">
          <input
            className="rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70 md:col-span-1"
            placeholder="Your name"
          />
          <input
            className="rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70 md:col-span-1"
            placeholder="Your email"
          />
          <textarea
            className="rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70 md:col-span-2 min-h-[80px]"
            placeholder="Your message"
          />
          <div className="md:col-span-2">
            <button
              type="button"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white"
              style={{ background: theme.primary }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
