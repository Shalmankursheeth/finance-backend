const { success } = require("zod");
const {
  createTransactionService,
  getTransactionsService,
  updateTransactionService,
  deleteTransactionService,
} = require("../services/transaction.service");

const { transactionSchema } = require("../utils/validators");

// CREATE
exports.createTransaction = async (req, res) => {
  try {
    const parsed = transactionSchema.parse(req.body);

    const transaction = await createTransactionService(parsed, req.user.id);

    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET
exports.getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "startDate cannot be after endDate",
      });
    }
    const filters = {};

    if (type) filters.type = type;
    if (category) filters.category = category;

    if (startDate || endDate) {
  filters.date = {};

  if (startDate && !isNaN(new Date(startDate))) {
    filters.date.gte = new Date(startDate);
  }

  if (endDate && !isNaN(new Date(endDate))) {
    filters.date.lte = new Date(endDate);
  }
}   
  if (req.user.role !== "ADMIN") {
  filters.userId = req.user.id;
}

    const transactions = await getTransactionsService(filters);

    res.json({
  success: true,
  data: transactions,
});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,});
  }
};

// UPDATE
exports.updateTransaction = async (req, res) => {
  try {
    const updated = await updateTransactionService(req.params.id, req.body);
    res.json({
  success: true,
  data: updated,
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteTransaction = async (req, res) => {
  try {
    await deleteTransactionService(req.params.id);
    res.json({ 
      success : true,
      message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};