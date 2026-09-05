const express = require('express');
const { getAdminProfile, createAdmin, loginAdmin, updateAdminProfile, changeAdminPassword } = require('../../controllers/admin/adminControllers');
const protectAdmin = require("../../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin");
const upload = require("../../middleware/upload");


const router = express.Router();

// create admin
router.post("/create", createAdmin);

//login admin
router.post("/login", loginAdmin);

// router.get("/update-admin-email", async (req, res) => {
//   const hashedPassword = await bcrypt.hash("123456", 10);

//   await Admin.findOneAndUpdate(
//     { email: "adminupdated@gmail.com" },
//     {
//       email: "raghavmishra98601@gmail.com",
//       password: hashedPassword
//     }
//   );

//   res.json({
//     success: true,
//     message: "Email and password updated successfully"
//   });
// });

// get admin profile
router.get("/profile/:id",protectAdmin, getAdminProfile);

// update profile
router.put("/profile/:id",protectAdmin,  upload.single("profileImage"), updateAdminProfile);

// update password
router.put("/change-password/:id",protectAdmin, changeAdminPassword)

module.exports = router;