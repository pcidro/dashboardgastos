import { z } from "zod";

export const updateTransactionSchema = z.object({
  params: z.object({
    id: z
      .string({ message: "Transaction ID is required" })
      .min(1, { message: "Transaction ID cannot be empty" }),
  }),
  body: z.object({
    description: z
      .string()
      .trim()
      .min(1, { message: "Description cannot be empty" })
      .optional(),
    amount: z
      .number()
      .positive({ message: "Amount must be greater than 0" })
      .optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .optional(),
    type: z
      .enum(["RECEITA", "DESPESA"], {
        message: "Type must be either RECEITA or DESPESA",
      })
      .optional(),
    status: z
      .enum(["PENDENTE", "PAGO", "ATRASADO"], {
        message: "Status must be PENDENTE, PAGO, or ATRASADO",
      })
      .optional(),
    paymentMethod: z
      .enum(
        [
          "PIX",
          "DINHEIRO",
          "CARTAO_DEBITO",
          "CARTAO_CREDITO",
          "TRANSFERENCIA_BANCARIA",
          "BOLETO",
          "OUTRO",
        ],
        {
          message: "Invalid payment method",
        }
      )
      .optional()
      .nullable(),
    categoryId: z
      .string()
      .min(1, { message: "Category ID cannot be empty" })
      .optional(),
    notes: z.string().optional().nullable(),
  }),
});
