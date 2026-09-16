import type { Request, Response } from "express";
import { GetTransactionService } from "../../services/transaction/getTransactionService.js";

export class GetTransactionController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const getTransactionService = new GetTransactionService();

    const transactions = await getTransactionService.execute({
      userId,
    });

    return res.json(transactions);
  }
}

export { GetTransactionController as getTransactionController };
