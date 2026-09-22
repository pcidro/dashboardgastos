import { z } from "zod";

export const resumoTransacationSchema = z.object({
  query: z
    .object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
    .optional(),
});
