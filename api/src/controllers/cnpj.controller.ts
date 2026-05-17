import { Request, Response } from "express";
import { z } from "zod";
import { cnpjParamSchema } from "../schemas/cnpj.schema";
import { fetchCnpjFromBrasilApi } from "../services/brasilapi.service";
import { transformBrasilApiResponse } from "../utils/data-transformer";
import { sendSuccess } from "../utils/http-response";
import { ValidationError } from "../utils/app-error";

export async function getCnpj(req: Request, res: Response): Promise<void> {
  const parsed = cnpjParamSchema.safeParse(req.params);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    const cnpjErrors = tree.properties?.cnpj?.errors ?? [];
    const firstMessage = cnpjErrors[0] ?? "CNPJ inválido";
    throw new ValidationError(firstMessage, { cnpj: cnpjErrors });
  }

  const raw = await fetchCnpjFromBrasilApi(parsed.data.cnpj);
  const data = transformBrasilApiResponse(raw);
  sendSuccess(res, data, { source: "brasilapi" });
}
