const express = require("express");
const router = express.Router();
const enq = require("../controllers/enquiryController");

router.post("/", enq.create);

module.exports = router;
