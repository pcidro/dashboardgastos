import { prisma } from "../../lib/prisma.js";

interface GetTransactionServiceProps {
  userId: string;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export class GetTransactionService {
  async execute({ userId, startDate, endDate }: GetTransactionServiceProps) {
    const dateFilter =
      startDate || endDate
        ? {
            ...(startDate ? { gte: new Date(startDate) } : {}),

            ...(endDate
              ? {
                  lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)),
                }
              : {}),
          }
        : undefined;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        ...(dateFilter ? { date: dateFilter } : {}),
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
