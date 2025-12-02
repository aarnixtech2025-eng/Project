const express = require("express");
const router = express.Router();
const cc = require("../controllers/christmasController");

router.get("/", cc.getAll);
router.post("/", cc.create);

module.exports = router;
