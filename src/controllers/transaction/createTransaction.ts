import type { Request, Response } from "express";
import { createTransactionService } from "../../services/transaction/createTransactionService.js";
import type { CreateTransactionDTO } from "../../types/transactionType.js";

export class createTransaction {
  async handle(req: Request, res: Response) {
    const {
      description,
      amount,
      date,
      type,
      status,
      paymentMethod,
      categoryId,
      notes,
    }: CreateTransactionDTO = req.body;
    const userId = req.user_id;
    const transaction = await new createTransactionService().execute({
      description,
      amount,
      date,
      paymentMethod,
      type,
      status,
      userId,
      categoryId,
      notes,
    });
    return res.json(transaction);
  }
}
