const express = require("express");

const router = express.Router();

const getDashboard = require("../../controllers/admin/dashboardControllers");
const protectAdmin = require("../../middleware/authMiddleware");

// Get Admin Dashboard
router.get("/", protectAdmin, getDashboard);

module.exports = router;