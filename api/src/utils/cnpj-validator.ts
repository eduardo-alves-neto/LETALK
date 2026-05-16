import { cnpj } from "cpf-cnpj-validator";

export function normalizeCnpj(input: string): string {
  return (input ?? "").replace(/\D/g, "");
}

export function formatCnpj(input: string): string {
  const digits = normalizeCnpj(input);
  if (digits.length !== 14) return input;
  return cnpj.format(digits);
}

export function validateCnpj(input: string): {
  valid: boolean;
  normalized: string;
} {
  const normalized = normalizeCnpj(input);
  return {
    valid: cnpj.isValid(normalized),
    normalized,
  };
}
