const express = require("express");
const router = express.Router();

const { signup, login, getUsers } = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);

// only admin can see users
router.get("/", authenticate, authorize(["ADMIN"]), getUsers);

module.exports = router;