import type { Request, Response } from "express";

import { GetTransactionByIdService } from "../../services/transaction/getTransactionbyIdService.js";

export class GetTransactionByIdController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;
    const { id } = req.params;

    const getTransactionbyIdService = new GetTransactionByIdService();

    const transaction = await getTransactionbyIdService.execute({
      userId,
      id: id as string,
    });

    return res.json(transaction);
  }
}

export { GetTransactionByIdController as getTransactionByIdController };

