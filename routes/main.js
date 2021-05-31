const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const ensureAuth = require("../middleware/auth");

router.get("/", homeController.getIndex);

module.exports = router;