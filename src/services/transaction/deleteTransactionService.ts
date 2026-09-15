import { prisma } from "../../lib/prisma.js";

interface deleteTransactionServiceProps {
  id: string;
}

export class deleteTransactionService {
  async execute({ id }: deleteTransactionServiceProps) {
    const transation = await prisma.transaction.delete({
      where: {
        id,
      },
    });
    return transation;
  }
}
