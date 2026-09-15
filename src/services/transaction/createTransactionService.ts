import { prisma } from "../../lib/prisma.js";
import type { CreateTransactionDTO } from "../../types/transactionType.js";

export class createTransactionService {
  async execute({
    description,
    amount,
    date,
    type,
    status,
    userId,
    categoryId,
    paymentMethod,
    notes,
  }: CreateTransactionDTO) {
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        date: new Date(date),
        paymentMethod,
        notes: notes ?? null,
        type,
        categoryId,
        userId,
        status,
      },
    });
    return transaction;
  }
}
