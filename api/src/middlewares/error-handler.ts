import { Request, Response, NextFunction } from "express";
import { treeifyError, ZodError } from "zod";
import { AppError } from "../utils/app-error";
import { buildErrorEnvelope } from "../utils/http-response";
import { ERROR_CODES } from "../constants/error-codes";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      buildErrorEnvelope({
        code: err.code,
        message: err.message,
        details: err.details,
      }),
    );
  }

  if (err instanceof ZodError) {
    return res.status(400).json(
      buildErrorEnvelope({
        code: ERROR_CODES.VALIDATION_ERROR,
        message: "Dados inválidos",
        details: treeifyError(err),
      }),
    );
  }

  console.error(`[ERRO] ${req.method} ${req.url}`, err);

  return res.status(500).json(
    buildErrorEnvelope({
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: "Erro interno do servidor",
    }),
  );
}
