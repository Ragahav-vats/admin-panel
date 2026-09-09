const express = require("express");
const protectAdmin = require("../../middleware/authMiddleware");
const { createUser, getUsers, getUserById, updateUser, deleteUser, blockUser } = require("../../controllers/admin/userControllers");

const router = express.Router();

// Create User
router.post("/create", protectAdmin, createUser);


// Get All Users
router.get("/", protectAdmin, getUsers);


// Update User
router.put("/update/:id", protectAdmin, updateUser);


// Delete User
router.delete("/delete/:id", protectAdmin, deleteUser);

// Block / Unblock User
router.put("/block/:id", protectAdmin, blockUser);


// Get User By ID
router.get("/:id", protectAdmin, getUserById);


module.exports = router;