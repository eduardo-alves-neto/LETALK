import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env";
import { notFoundHandler } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import { v1Router } from "./routes";
import { sendSuccess } from "./utils/http-response";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGINS?.split(",").map((o) => o.trim()),
    }),
  );

  app.use(express.json());

  app.get("/api/v1/health", (_req: Request, res: Response) => {
    sendSuccess(res, { status: "ok" });
  });

  app.use("/api/v1", v1Router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
