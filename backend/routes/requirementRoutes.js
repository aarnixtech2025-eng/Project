const express = require("express");
const router = express.Router();
const rc = require("../controllers/requirementController");

router.post("/", rc.create);

module.exports = router;
