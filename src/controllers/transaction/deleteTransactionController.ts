import type { Request, Response } from "express";
import { deleteTransactionService } from "../../services/transaction/deleteTransactionService.js";

export class deleteTransactionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user_id;
    const transaction = await new deleteTransactionService().execute({
      id: id as string,
      userId,
    });
    return res.json(transaction);
  }
}
