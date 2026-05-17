import { Request, Response } from "express";
import { buildErrorEnvelope } from "../utils/http-response";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json(
    buildErrorEnvelope({
      code: "ROUTE_NOT_FOUND",
      message: `Rota ${req.method} não encontrada`,
    }),
  );
}
