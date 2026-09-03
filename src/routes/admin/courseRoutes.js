const express = require("express");
const { createCourse, getCourses, filterCourses, getCourseById, updateCourse, deleteCourse } = require("../../controllers/admin/courseControllers");
const protectAdmin = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protectAdmin, createCourse);

router.get("/", protectAdmin, getCourses);

router.get("/filter", protectAdmin, filterCourses);

router.get("/:id", protectAdmin, getCourseById);

router.put("/update/:id", protectAdmin, updateCourse);

router.delete("/delete/:id", protectAdmin, deleteCourse);

module.exports = router;