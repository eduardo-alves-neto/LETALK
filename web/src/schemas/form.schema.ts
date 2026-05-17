import { z } from "zod";
import { isValidCnpj } from "@/lib/masks";

export const formSchema = z.object({
  name: z.string().trim().min(2, "Nome obrigatório"),
  email: z.string().trim().email("Email inválido"),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Telefone inválido"),
  cnpj: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length === 14, "CNPJ deve ter 14 dígitos")
    .refine(isValidCnpj, "CNPJ inválido"),
  role: z.string().trim().optional(),
});

export type LeadFormData = z.infer<typeof formSchema>;
