import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";

interface deleteTransactionServiceProps {
  id: string;
  userId: string;
}

export class deleteTransactionService {
  async execute({ id, userId }: deleteTransactionServiceProps) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new AppError("Nenhuma transação encontrada");
    }

    if (transaction.userId !== userId) {
      throw new AppError(
        "Unauthorized! You can only delete your own transactions.",
        403,
      );
    }

    const transation = await prisma.transaction.delete({
      where: {
        id,
      },
    });
    return transation;
  }
}
