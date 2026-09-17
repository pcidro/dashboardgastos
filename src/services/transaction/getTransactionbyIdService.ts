import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";

interface GetTransactionByIdServiceProps {
  userId: string;
  id: string;
}

export class GetTransactionByIdService {
  async execute({ userId, id }: GetTransactionByIdServiceProps) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new AppError("No transaction Found!", 404);
    }

    return transaction;
  }
}
