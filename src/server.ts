import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes.js";
import { transactionRoutes } from "./routes/transaction.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", transactionRoutes);

app.get("/", (request, response) => {
  return response.json({
    message: "Servidor funcionando!",
  });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
