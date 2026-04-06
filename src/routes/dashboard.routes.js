const express = require("express");
const router = express.Router();

const { getSummary } = require("../controllers/dashboard.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

// Viewer + Analyst + Admin
router.get("/", authenticate, authorize(["VIEWER","ANALYST", "ADMIN"]), getSummary);

module.exports = router;