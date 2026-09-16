import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";
import type {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
} from "../../types/transactionType.js";

interface UpdateCatServiceProps {
  id: string;
  userId: string;
  amount?: number;
  description?: string;
  date?: Date | string;
  status?: TransactionStatus;
  paymentMethod?: PaymentMethod | null;
  categoryId?: string;
  type?: TransactionType;
  notes?: string | null;
}

export class updateTransactionService {
  async execute({
    id,
    description,
    userId,
    amount,
    status,
    paymentMethod,
    categoryId,
    type,
    date,
    notes,
  }: UpdateCatServiceProps) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
      },
    });
    if (!transaction) {
      throw new AppError("No transaction Found!", 404);
    }

    if (transaction.userId !== userId) {
      throw new AppError(
        "Unauthorized! You can only edit your own transactions.",
        403,
      );
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        description: description ?? transaction.description,
        amount: amount ?? transaction.amount,
        date: date ? new Date(date) : transaction.date,
        status: status ?? transaction.status,
        paymentMethod: paymentMethod ?? transaction.paymentMethod,
        categoryId: categoryId ?? transaction.categoryId,
        type: type ?? transaction.type,
        notes: notes ?? transaction.notes,
      },
    });

    return updatedTransaction;
  }
}
