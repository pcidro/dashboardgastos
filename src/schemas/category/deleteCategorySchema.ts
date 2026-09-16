import { z } from "zod";

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z
      .string({ message: "Category ID is required" })
      .min(1, { message: "Category ID cannot be empty" }),
  }),
});
