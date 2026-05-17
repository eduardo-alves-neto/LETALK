import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CNAE_SEGMENT_MAP } from "@/constants/cnae";
import type { CompanyTaxRegimeYear } from "@/types/company.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCnae(code: number | string): string {
  return String(code)
    .padStart(7, "0")
    .replace(/^(\d{4})(\d)(\d{2})/, "$1-$2/$3");
}

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export function computeYearsSince(iso: string): number {
  const start = new Date(iso);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--;
  }
  return years;
}

export function segmentFromCnae(code: number | string): string {
  const prefix = String(code).padStart(7, "0").slice(0, 2);
  return CNAE_SEGMENT_MAP[prefix] ?? "Outros";
}

export function currentTaxRegime(history: CompanyTaxRegimeYear[]): string {
  if (!history?.length) return "Não informado";
  const latest = [...history].sort((a, b) => b.year - a.year)[0];
  return `${latest.taxation} (${latest.year})`;
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, "($1");
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
  if (digits.length <= 10)
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}
