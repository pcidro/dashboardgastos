import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  }),
});
