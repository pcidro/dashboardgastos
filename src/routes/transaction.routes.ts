import { Router } from "express";
import { createTransaction } from "../controllers/transaction/createTransaction.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const transactionRoutes = Router();

transactionRoutes.post(
  "/transaction",
  isAuthenticated,
  new createTransaction().handle,
);

export { transactionRoutes };
