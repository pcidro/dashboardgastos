import { z } from "zod";

export const updateCategorySchema = z.object({
  params: z.object({
    id: z
      .string({ message: "Category ID is required" })
      .min(1, { message: "Category ID cannot be empty" }),
  }),
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name cannot be empty" })
      .optional(),
    color: z.string().optional().nullable(),
  }),
});
