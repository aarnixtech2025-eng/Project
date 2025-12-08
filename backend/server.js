// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// routes
const BankDetailsRoutes=require("./routes/SellerRoutes/BankDetailsroutes");
const userProfileRoutes = require("./routes/SellerRoutes/Userprofileroutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const trendingRoutes = require("./routes/trendingCategoryRoutes");
const airCleaningRoutes = require("./routes/airCleaningRoutes");
const christmasRoutes = require("./routes/christmasRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const requirementRoutes = require("./routes/requirementRoutes");

const app = express();

// Middlewares
app.use(cors());
// express.json is sufficient; no need for body-parser separately
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// base health check
app.get("/", (req, res) => res.json({ status: "ok", time: new Date() }));

// === API mounts ===
// NOTE: mount userProfile routes at plural path and with a leading slash
app.use("/api/userprofiles", userProfileRoutes);

// Keep other mounts (avoid duplicates)
app.use("/api/Bankdetails",BankDetailsRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes); // additional endpoints under /api
app.use("/api/trendingcategories", trendingRoutes);
app.use("/api/aircleaning", airCleaningRoutes);
app.use("/api/christ", christmasRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/requirements", requirementRoutes);

// error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
