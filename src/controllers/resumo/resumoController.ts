import type { Request, Response } from "express";
import { ResumoService } from "../../services/resumo/resumoService.js";

export class resumoController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const { startDate, endDate } = req.query as {
      startDate?: string;
      endDate?: string;
    };

    const resumoService = new ResumoService();

    const summary = await resumoService.execute({
      userId,
      startDate,
      endDate,
    });

    return res.json(summary);
  }
}
