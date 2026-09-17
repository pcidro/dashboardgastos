import { z } from "zod";

export const getTransactionSchema = z.object({
  query: z
    .object({
      type: z.enum(["RECEITA", "DESPESA"]).optional(),
      status: z.enum(["PENDENTE", "PAGO", "ATRASADO"]).optional(),
      categoryId: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
    .optional(),
});
