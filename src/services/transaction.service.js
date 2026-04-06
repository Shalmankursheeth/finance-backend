const prisma = require("../config/db");

exports.createTransactionService = async (data, userId) => {
  return await prisma.transaction.create({
    data: {
      ...data,
      date: new Date(data.date),
      userId,
    },
  });
};

exports.getTransactionsService = async (filters) => {
  return await prisma.transaction.findMany({
    where: filters,
    orderBy: { date: "desc" },
  });
};

exports.updateTransactionService = async (id, data) => {
  return await prisma.transaction.update({
    where: { id: Number(id) },
    data,
  });
};

exports.deleteTransactionService = async (id) => {
  return await prisma.transaction.delete({
    where: { id: Number(id) },
  });
};