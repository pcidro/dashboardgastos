import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const { verify, TokenExpiredError } = jwt;

interface PayLoadProps {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: "Token não fornecido",
    });
  }

  const parts = authToken.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Formato do token inválido" });
  }

  const token = parts[1];

  try {
    const { sub } = verify(
      token!,
      process.env.JWT_SECRET as string,
    ) as PayLoadProps;

    req.user_id = sub;

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }
    return res.status(401).json({ error: "Token invalido" });
  }
}
