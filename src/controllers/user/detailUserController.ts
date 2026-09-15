import type { Request, Response } from "express";
import { DetailUserService } from "../../services/user/detailUserService.js";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.user_id;

      const detailUserService = new DetailUserService();

      const user = await detailUserService.execute(userId);

      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
