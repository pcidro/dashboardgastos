import type { Request, Response } from "express";
import { GetTransactionService } from "../../services/transaction/getTransactionService.js";

export class GetTransactionController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const getTransactionService = new GetTransactionService();

    const { startDate, endDate } = req.query as {
      startDate?: string;
      endDate?: string;
    };

    const transactions = await getTransactionService.execute({
      userId,
      startDate,
      endDate,
    });

    return res.json(transactions);
  }
}

export { GetTransactionController as getTransactionController };
