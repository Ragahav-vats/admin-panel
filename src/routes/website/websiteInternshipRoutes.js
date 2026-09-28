const express = require("express");

const {
  getWebsiteInternships,
  getWebsiteInternshipById
} = require("../../controllers/website/websiteInternshipControllers");

const router = express.Router();

router.get("/", getWebsiteInternships);
router.get("/:id", getWebsiteInternshipById);

module.exports = router;