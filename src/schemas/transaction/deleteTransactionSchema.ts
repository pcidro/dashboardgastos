import { z } from "zod";

export const deleteTransactionSchema = z.object({
  params: z.object({
    id: z
      .string({ message: "Transaction ID is required" })
      .min(1, { message: "Transaction ID cannot be empty" }),
  }),
});
