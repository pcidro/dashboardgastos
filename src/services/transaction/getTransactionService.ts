import { prisma } from "../../lib/prisma.js";

interface GetTransactionServiceProps {
  userId: string;
}

export class GetTransactionService {
  async execute({ userId }: GetTransactionServiceProps) {
    const transactions = await prisma.transaction.findMany({
      where: {
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
      orderBy: {
        date: "desc",
      },
    });

    return transactions;
  }
}

export { GetTransactionService as getTransactionService };
