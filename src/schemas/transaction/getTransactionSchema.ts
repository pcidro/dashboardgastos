import { z } from "zod";

export const getTransactionSchema = z.object({
  query: z
    .object({
      type: z.enum(["INCOME", "EXPENSE"]).optional(),
      status: z.enum(["PENDING", "PAID", "OVERDUE"]).optional(),
      categoryId: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
    .optional(),
});
