import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const cnpjParamSchema = z.object({
  cnpj: z
    .string()
    .min(14, "CNPJ deve ter no mínimo 14 caracteres")
    .max(18, "CNPJ inválido")
    .refine((val) => cnpj.isValid(val), "CNPJ inválido (dígito verificador incorreto)"),
});

export type CnpjParam = z.infer<typeof cnpjParamSchema>;
