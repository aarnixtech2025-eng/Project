
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// routes
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const trendingRoutes = require("./routes/trendingCategoryRoutes");
const airCleaningRoutes = require("./routes/airCleaningRoutes");
const christmasRoutes = require("./routes/christmasRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const requirementRoutes = require("./routes/requirementRoutes");
const businessProfile = require("./models/businessProfileSchema");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB
connectDB();

// base health check
app.get("/", (req, res) => res.json({ status: "ok", time: new Date() }));

// API mount
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes); // /api/user-count
app.use("/api/categories", categoryRoutes);
app.use("/api/trendingcategories", trendingRoutes);
app.use("/api", require("./routes/productRoutes"));


app.use("/api/aircleaning", airCleaningRoutes);
app.use("/api/christ", christmasRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/requirements", requirementRoutes);
app.use("/api/business-profile",businessProfile);
// error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
