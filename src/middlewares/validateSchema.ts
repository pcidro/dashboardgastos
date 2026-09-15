import type { NextFunction, Request, Response } from "express";

import { ZodError, ZodType } from "zod";

export const validateSchema =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as { body?: unknown; query?: unknown; params?: unknown };

      if (parsed.body !== undefined) {
        req.body = parsed.body;
      }
      if (parsed.query !== undefined) {
        req.query = parsed.query as any;
      }
      if (parsed.params !== undefined) {
        req.params = parsed.params as any;
      }

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: error.issues.map((issue) => ({
            field: issue.path.slice(1).join("."),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  };
