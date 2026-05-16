import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  console.error(`[ERRO] ${req.method} ${req.url}`, err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Erro interno do servidor",
    },
  });
}
