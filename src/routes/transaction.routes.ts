import { Router } from "express";
import { createTransaction } from "../controllers/transaction/createTransaction.js";
import { UpdateTransactionController } from "../controllers/transaction/edittransactionController.js";
import { deleteTransactionController } from "../controllers/transaction/deleteTransactionController.js";
import { GetTransactionController } from "../controllers/transaction/getTransactionController.js";
import { GetTransactionByIdController } from "../controllers/transaction/gettransactionbyIdController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createTransactionSchema } from "../schemas/transaction/createTransactionSchema.js";
import { updateTransactionSchema } from "../schemas/transaction/updateTransactionSchema.js";
import { deleteTransactionSchema } from "../schemas/transaction/deleteTransactionSchema.js";
import { getTransactionSchema } from "../schemas/transaction/getTransactionSchema.js";
import { getTransactionByIdSchema } from "../schemas/transaction/getTransactionByIdSchema.js";

const transactionRoutes = Router();

transactionRoutes.post(
  "/transaction",
  isAuthenticated,
  validateSchema(createTransactionSchema),
  new createTransaction().handle,
);

transactionRoutes.get(
  "/transaction",
  isAuthenticated,
  validateSchema(getTransactionSchema),
  new GetTransactionController().handle,
);

transactionRoutes.get(
  "/transactions",
  isAuthenticated,
  validateSchema(getTransactionSchema),
  new GetTransactionController().handle,
);

transactionRoutes.get(
  "/transaction/:id",
  isAuthenticated,
  validateSchema(getTransactionByIdSchema),
  new GetTransactionByIdController().handle,
);

transactionRoutes.put(
  "/transaction/:id",
  isAuthenticated,
  validateSchema(updateTransactionSchema),
  new UpdateTransactionController().handle,
);

transactionRoutes.delete(
  "/transaction/:id",
  isAuthenticated,
  validateSchema(deleteTransactionSchema),
  new deleteTransactionController().handle,
);

export { transactionRoutes };

