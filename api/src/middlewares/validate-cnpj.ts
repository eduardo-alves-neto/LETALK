import { Request, Response, NextFunction } from "express";
import { cnpjParamSchema } from "../schemas/cnpj.schema";
import { InvalidCnpjError } from "../utils/app-error";
import { normalizeCnpj } from "../utils/cnpj-validator";

export function validateCnpjParam(req: Request, _res: Response, next: NextFunction) {
  const result = cnpjParamSchema.safeParse(req.params);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "CNPJ inválido";
    throw new InvalidCnpjError(message);
  }

  req.params.cnpj = normalizeCnpj(String(req.params.cnpj));
  next();
}
