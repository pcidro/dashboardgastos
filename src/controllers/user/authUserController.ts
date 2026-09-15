import type { Request, Response } from "express";
import { AuthUserService } from "../../services/user/authUserService.js";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authUserService = new AuthUserService();

      const auth = await authUserService.execute({
        email,
        password,
      });

      return res.json(auth);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
