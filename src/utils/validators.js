const { z } = require("zod");

// Transaction validation
const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "Invalid date",
  }),
  notes: z.string().optional(),
});

module.exports = {
  transactionSchema,
};