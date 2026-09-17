import { z } from "zod";

export const createTransactionSchema = z.object({
  body: z.object({
    description: z
      .string({ message: "Description is required" })
      .trim()
      .min(1, { message: "Description cannot be empty" }),
    amount: z
      .number({ message: "Amount is required" })
      .positive({ message: "Amount must be greater than 0" }),
    date: z
      .string({ message: "Date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    type: z.enum(["RECEITA", "DESPESA"], {
      message: "Type must be either RECEITA or DESPESA",
    }),
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
      .string({ message: "Category ID is required" })
      .min(1, { message: "Category ID cannot be empty" }),
    notes: z.string().optional().nullable(),
  }),
});
