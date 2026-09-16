import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name is required" })
      .trim()
      .min(1, { message: "Name cannot be empty" }),
    color: z.string().optional().nullable(),
  }),
});
