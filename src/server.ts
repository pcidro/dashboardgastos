import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes.js";
import { transactionRoutes } from "./routes/transaction.routes.js";
import { categoriesRoutes } from "./routes/categories.routes.js";
import { AppError } from "./middlewares/AppError.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", transactionRoutes);
app.use("/api", categoriesRoutes);

app.get("/", (request, response) => {
  return response.json({
    message: "Servidor funcionando!",
  });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
