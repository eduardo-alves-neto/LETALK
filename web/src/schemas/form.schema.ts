import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const formSchema = z.object({
  name: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || z.string().email().safeParse(v).success,
      "E-mail inválido",
    ),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || v.replace(/\D/g, "").length >= 10,
      "Telefone inválido",
    ),
  role: z.string().trim().optional(),
  cnpj: z
    .string()
    .trim()
    .min(1, "CNPJ obrigatório")
    .refine(
      (v) => v.replace(/\D/g, "").length === 14,
      "CNPJ deve ter 14 dígitos",
    )
    .refine(cnpj.isValid, "CNPJ inválido"),
});

export type LeadFormData = z.infer<typeof formSchema>;
