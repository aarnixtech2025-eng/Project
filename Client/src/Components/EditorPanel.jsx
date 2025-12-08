import React from "react";
import Field from "./Field.jsx";

export default function EditorPanel({
  company,
  theme,
  updateField,
  updateService,
  addService,
  updateProduct,
  addProduct,
}) {
  return (
    <section className="bg-white border border-slate-300 rounded-2xl p-4 space-y-4 shadow-sm max-h-[calc(100vh-120px)] overflow-y-auto">
      <h2 className="text-lg font-semibold">Edit Website Content</h2>
      <p className="text-sm text-slate-500">
        These fields control what is shown on your generated company website:
        hero section, about, products, and contact info (including GST).
      </p>

      {/* Basic info */}
      <div className="space-y-3">
        <Field
          label="Company Name"
          value={company.name}
          onChange={(v) => updateField("name", v)}
          placeholder="Your company name"
        />
        <Field
          label="Tagline"
          value={company.tagline}
          onChange={(v) => updateField("tagline", v)}
          placeholder="Short line about your company"
        />
        <Field
          label="Logo URL"
          value={company.logoUrl}
          onChange={(v) => updateField("logoUrl", v)}
          placeholder="https://example.com/logo.png"
        />
        <Field
          label="Hero Background Image URL"
          value={company.heroImage}
          onChange={(v) => updateField("heroImage", v)}
          placeholder="Image shown behind the hero section"
        />
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700 w-32">
            Primary Color
          </label>
          <input
            type="color"
            value={theme.primary}
            disabled
            className="h-8 w-12 rounded border border-slate-300 bg-white cursor-not-allowed"
          />
          <span className="text-xs text-slate-500">
            Change via theme dropdown at top.
          </span>
        </div>
      </div>

      {/* About */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          About Section
        </label>
        <textarea
          className="w-full min-h-[80px] rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          value={company.about}
          onChange={(e) => updateField("about", e.target.value)}
        />
      </div>

      {/* Services */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Services</span>
          <button
            type="button"
            onClick={addService}
            className="px-2.5 py-1 rounded-full border border-slate-300 bg-slate-50 text-xs text-slate-700 hover:bg-slate-100"
          >
            + Add Service
          </button>
        </div>
        <div className="space-y-2">
          {company.services.map((s, i) => (
            <input
              key={i}
              className="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
              placeholder={`Service ${i + 1}`}
              value={s}
              onChange={(e) => updateService(i, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Products / Items
          </span>
          <button
            type="button"
            onClick={addProduct}
            className="px-2.5 py-1 rounded-full border border-slate-300 bg-slate-50 text-xs text-slate-700 hover:bg-slate-100"
          >
            + Add Product
          </button>
        </div>
        <p className="text-xs text-slate-500">
          These will be displayed under the Products page.
        </p>
        <div className="space-y-3">
          {company.products.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-300 bg-slate-50 p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Product {i + 1}
                </span>
              </div>
              <Field
                label="Name"
                value={p.name}
                onChange={(v) => updateProduct(i, "name", v)}
                placeholder="Product name"
              />
              <div className="grid grid-cols-[1.5fr,1fr,0.8fr] gap-2">
                <Field
                  label="Category"
                  value={p.category}
                  onChange={(v) => updateProduct(i, "category", v)}
                  placeholder="e.g. SaaS, Food"
                />
                <Field
                  label="Price"
                  value={p.price}
                  onChange={(v) => updateProduct(i, "price", v)}
                  placeholder="e.g. 2999"
                />
                <Field
                  label="Currency"
                  value={p.currency}
                  onChange={(v) => updateProduct(i, "currency", v)}
                  placeholder="INR / USD"
                />
              </div>
              <Field
                label="Image URL"
                value={p.image}
                onChange={(v) => updateProduct(i, "image", v)}
                placeholder="https://example.com/product.jpg"
              />
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70 min-h-[60px]"
                  placeholder="Short description"
                  value={p.description}
                  onChange={(e) =>
                    updateProduct(i, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact + GST */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-700">
          Contact & Legal Details
        </h3>
        <Field
          label="Address"
          value={company.address}
          onChange={(v) => updateField("address", v)}
          placeholder="Company address"
        />
        <Field
          label="Email"
          value={company.email}
          onChange={(v) => updateField("email", v)}
          placeholder="contact@company.com"
        />
        <Field
          label="Phone"
          value={company.phone}
          onChange={(v) => updateField("phone", v)}
          placeholder="+91 **********"
        />
        <Field
          label="Website"
          value={company.website}
          onChange={(v) => updateField("website", v)}
          placeholder="https://yourdomain.com"
        />
        <Field
          label="GST Number"
          value={company.gst}
          onChange={(v) => updateField("gst", v)}
          placeholder="e.g. 29ABCDE1234F1Z5"
        />
      </div>
    </section>
  );
}
