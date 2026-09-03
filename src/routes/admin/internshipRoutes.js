const express = require("express");
const protectAdmin = require("../../middleware/authMiddleware");
const { createInternship, getInternships, getInternshipById, filterInternships, updateInternship, deleteInternship } = require("../../controllers/admin/internshipControllers");

const router = express.Router();

router.post("/create", protectAdmin,createInternship);

router.get("/", protectAdmin, getInternships);

router.get("/filter", protectAdmin, filterInternships);

router.put("/update/:id", protectAdmin, updateInternship);

router.delete("/delete/:id", protectAdmin, deleteInternship);

router.get("/:id", protectAdmin, getInternshipById);

module.exports = router;