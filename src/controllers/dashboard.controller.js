const prisma = require("../config/db");

exports.getSummary = async (req, res) => {
  try {
    
    const where = {};

if (req.user.role !== "ADMIN") {
  where.userId = req.user.id;
}

const transactions = await prisma.transaction.findMany({ where });
    let totalIncome = 0;
    let totalExpense = 0;
    let categoryMap = {};

    transactions.forEach((t) => {
  const type = t.type.trim().toUpperCase(); // 🔥 FIX

  if (type === "INCOME") {
    totalIncome += t.amount;
  } else if (type === "EXPENSE") {
    totalExpense += t.amount;
  }

  // category
  if (!categoryMap[t.category]) {
    categoryMap[t.category] = 0;
  }
  categoryMap[t.category] += t.amount;
});

    const netBalance = totalIncome - totalExpense;

    // 🔥 NEW: recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
      take: 5,
    });

    const monthly = {};

transactions.forEach((t) => {
  const month = new Date(t.date).toISOString().slice(0, 7); // "2026-04"

  if (!monthly[month]) {
    monthly[month] = { income: 0, expense: 0 };
  }

  if (t.type === "INCOME") {
    monthly[month].income += t.amount;
  } else {
    monthly[month].expense += t.amount;
  }
});
    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance,
        categoryBreakdown: categoryMap,
        recentTransactions,
        monthlyTrends: monthly
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};