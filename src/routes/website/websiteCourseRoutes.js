const express = require("express");
const { getWebsiteCourses, getWebsiteCourseById } = require("../../controllers/website/websiteCourseControllers");



const router = express.Router();

router.get("/", getWebsiteCourses);
router.get("/:id", getWebsiteCourseById);

module.exports = router;