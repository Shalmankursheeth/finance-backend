const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const { authenticate, authorize } = require("../middleware/auth.middleware");

// Create → Admin only
router.post("/", authenticate, authorize(["ADMIN"]), createTransaction);

// Read → Analyst + Admin
router.get("/", authenticate, authorize(["ANALYST", "ADMIN"]), getTransactions);

// Update → Admin
router.put("/:id", authenticate, authorize(["ADMIN"]), updateTransaction);

// Delete → Admin
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteTransaction);

module.exports = router;