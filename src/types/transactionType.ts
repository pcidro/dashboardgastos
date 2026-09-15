export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionStatus = "PENDING" | "PAID" | "OVERDUE";

export type PaymentMethod =
  | "PIX"
  | "CASH"
  | "DEBIT_CARD"
  | "CREDIT_CARD"
  | "BANK_TRANSFER"
  | "BOLETO"
  | "OTHER";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod: PaymentMethod | null;
  notes?: string | null;
  userId: string;
  categoryId: string;
}

export type CreateTransactionDTO = Omit<Transaction, "id">;

export interface TransactionTypeData {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod?: PaymentMethod | null;
  notes?: string | null;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
