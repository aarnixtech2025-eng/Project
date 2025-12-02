const express = require("express");
const router = express.Router();
const tCtrl = require("../controllers/trendingCategoryController");

router.get("/", tCtrl.getTrending);
router.post("/", tCtrl.createTrending);

module.exports = router;
