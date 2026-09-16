import { Router } from "express";
import { createTransaction } from "../controllers/transaction/createTransaction.js";
import { UpdateTransactionController } from "../controllers/transaction/edittransactionController.js";
import { deleteTransactionController } from "../controllers/transaction/deleteTransactionController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const transactionRoutes = Router();

transactionRoutes.post(
  "/transaction",
  isAuthenticated,
  new createTransaction().handle,
);

transactionRoutes.put(
  "/transaction/:id",
  isAuthenticated,
  new UpdateTransactionController().handle,
);

transactionRoutes.delete(
  "/transaction/:id",
  isAuthenticated,
  new deleteTransactionController().handle,
);

export { transactionRoutes };
