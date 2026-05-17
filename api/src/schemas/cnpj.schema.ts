import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";
import { normalizeCnpj } from "../utils/data-transformer";

export const cnpjParamSchema = z.object({
  cnpj: z
    .string({ message: "CNPJ é obrigatório" })
    .min(1, "CNPJ é obrigatório")
    .transform(normalizeCnpj)
    .pipe(
      z
        .string()
        .length(14, "CNPJ deve ter 14 dígitos")
        .refine((val) => cnpj.isValid(val), "CNPJ inválido (dígito verificador incorreto)"),
    ),
});
