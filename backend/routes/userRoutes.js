const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.get("/user-count", userCtrl.getUserCount);

module.exports = router;
