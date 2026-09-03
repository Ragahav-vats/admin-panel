const express = require('express');
const { getAdminProfile, createAdmin, loginAdmin, updateAdminProfile, changeAdminPassword } = require('../../controllers/admin/adminControllers');
const protectAdmin = require("../../middleware/authMiddleware");


const router = express.Router();

// create admin
router.post("/create", createAdmin);

//login admin
router.post("/login", loginAdmin);

// get admin profile
router.get("/profile/:id",protectAdmin, getAdminProfile);

// update profile
router.put("/profile/:id",protectAdmin, updateAdminProfile);

// update password
router.put("/change-password/:id",protectAdmin, changeAdminPassword)

module.exports = router;