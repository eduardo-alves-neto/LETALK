import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

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

app.listen(PORT, () => {
  console.log(`The Server is Hosted on Port ${PORT}...`);
});
