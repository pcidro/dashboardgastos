import type { Request, Response } from "express";
import { updateTransactionService } from "../../services/transaction/updateTransactionService.js";

export class UpdateCatController {
  async handle(req: Request, res: Response) {
    const {
      description,
      amount,
      status,
      paymentMethod,
      categoryId,
      type,
      date,
      notes,
    } = req.body;
    const { id } = req.params;
    const userId = req.user_id;

    const updatetransactionService = new updateTransactionService();

    const transaction = await updatetransactionService.execute({
      id: id as string,
      userId,
      description,
      amount,
      status,
      paymentMethod,
      categoryId,
      type,
      date,
      notes,
    });

    return res.json(transaction);
  }
}
