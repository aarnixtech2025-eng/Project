// // src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import CategoryPage from "./Components/CategoryPage";
// import AllCategories from "./Components/AllCategories";
// import SubcategoryPage from "./Components/SubcategoryPage";

// // ⭐ Import the new page
// import AllFeaturedProducts from "./Components/AllFeaturedProducts";
// import EnquiryForm from "./Components/EnquiryForm";
// import ProductCard from "./Components/ProductCard";
// import SubcategoryDetailPage from "./Components/SubcategoryDetailPage";
// const App = () => {
//   return (<>

//     <Routes>
//       {/* Existing routes */}
//       <Route path="/" element={<CategoryPage />} />
//       <Route path="/all-categories" element={<AllCategories />} />
//       <Route path="/categories/:id/subcategories" element={<SubcategoryPage />} />

//       {/* ⭐ NEW ROUTE for full featured products page */}
//       <Route path="/featured-products" element={<AllFeaturedProducts />} />
//       <Route path="/enquiry-form" element={<EnquiryForm />} />
//       <Route path="/subcategories/:id" element={<SubcategoryDetailPage />} />


//     </Routes>
//     <ProductCard></ProductCard>
//   </>

//   );
// };

// export default App;


import React, { useState } from "react";
import EditorPanel from "./Components/EditorPanel.jsx";
import WebsitePreview from "./Components/WebsitePreview.jsx";

const COLOR_THEMES = [
  {
    id: "blue",
    name: "Blue Sky",
    primary: "#2563eb",
    secondary: "#1d4ed8",
    accent: "#0ea5e9",
  },
  {
    id: "green",
    name: "Fresh Green",
    primary: "#16a34a",
    secondary: "#15803d",
    accent: "#22c55e",
  },
  {
    id: "purple",
    name: "Royal Purple",
    primary: "#7c3aed",
    secondary: "#6d28d9",
    accent: "#a855f7",
  },
];

export default function App() {
  const [themeId, setThemeId] = useState("blue");

  const [company, setCompany] = useState({
    name: "Acme Digital Solutions",
    tagline: "We build powerful digital products for modern businesses.",
    logoUrl: "",
    heroImage:
      "https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg?auto=compress&cs=tinysrgb&w=1200",
    about:
      "Acme Digital Solutions is a modern technology company specializing in custom web, mobile, and cloud solutions. We help businesses launch, scale, and optimize their digital products.",
    services: [
      "Custom Web Application Development",
      "Mobile App Development",
      "UI/UX Design & Branding",
    ],
    products: [
      {
        name: "ProjectFlow",
        category: "SaaS",
        price: "29",
        currency: "USD",
        image:
          "https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg?auto=compress&cs=tinysrgb&w=1200",
        description:
          "A project management platform to keep your team aligned and productive.",
      },
      {
        name: "InsightBoard",
        category: "Analytics",
        price: "49",
        currency: "USD",
        image:
          "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200",
        description:
          "A beautiful analytics dashboard to monitor KPIs and business metrics.",
      },
    ],
    address: "123 Business Street, Tech City",
    email: "info@acmedigital.com",
    phone: "+91 98765 43210",
    website: "https://acme-demo.com",
    gst: "29ABCDE1234F1Z5",
  });

  const theme = COLOR_THEMES.find((t) => t.id === themeId) || COLOR_THEMES[0];

  const updateField = (field, value) =>
    setCompany((prev) => ({ ...prev, [field]: value }));

  const updateService = (index, value) => {
    const copy = [...company.services];
    copy[index] = value;
    setCompany((prev) => ({ ...prev, services: copy }));
  };

  const addService = () =>
    setCompany((prev) => ({ ...prev, services: [...prev.services, ""] }));

  const updateProduct = (index, field, value) => {
    const copy = [...company.products];
    copy[index] = { ...copy[index], [field]: value };
    setCompany((prev) => ({ ...prev, products: copy }));
  };

  const addProduct = () =>
    setCompany((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          name: "",
          category: "",
          price: "",
          currency: "",
          image: "",
          description: "",
        },
      ],
    }));

  const [showPreviewOnly, setShowPreviewOnly] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md"
              style={{ background: theme.primary }}
            >
              {company.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold">
                Company Website Generator
              </h1>
              <p className="text-sm text-slate-500">
                Enter your company details & products – the website preview updates
                automatically.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Color theme:</span>
              <select
                className="border border-slate-300 rounded-lg px-3 py-1 bg-white text-sm"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
              >
                {COLOR_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowPreviewOnly((v) => !v)}
              className="text-sm px-3 py-1 rounded-full border border-slate-300 bg-white hover:bg-slate-50"
            >
              {showPreviewOnly ? "Show Editor + Preview" : "Preview Only"}
            </button>
          </div>
        </header>

        <div
          className={`grid gap-5 ${
            showPreviewOnly ? "grid-cols-1" : "md:grid-cols-[1.4fr,2fr]"
          }`}
        >
          {!showPreviewOnly && (
            <EditorPanel
              company={company}
              theme={theme}
              updateField={updateField}
              updateService={updateService}
              addService={addService}
              updateProduct={updateProduct}
              addProduct={addProduct}
            />
          )}

          <WebsitePreview company={company} theme={theme} />
        </div>
      </div>
    </div>
  );
}


