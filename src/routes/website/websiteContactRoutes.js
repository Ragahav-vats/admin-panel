const express = require("express");

const {
  createContact
} = require("../../controllers/website/websiteContactControllers");

const router = express.Router();

router.post("/", createContact);

module.exports = router;