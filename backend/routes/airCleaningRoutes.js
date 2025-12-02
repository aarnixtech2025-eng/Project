const express = require("express");
const router = express.Router();
const ac = require("../controllers/airCleaningController");

router.get("/", ac.getAll);
router.post("/", ac.create);

module.exports = router;
