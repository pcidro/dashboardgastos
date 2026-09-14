import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({
    message: "Servidor funcionando!",
  });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
