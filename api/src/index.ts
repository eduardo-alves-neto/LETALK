import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { notFoundHandler } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import { cnpjRouter } from "./routes/cnpj.routes";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(",") || "*",
  }),
);

app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/cnpj", cnpjRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The Server is Hosted on Port ${PORT}...`);
});
