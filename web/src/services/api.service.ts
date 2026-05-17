import { ApiError, type CompanyResponse, type SuccessEnvelope, type ApiErrorBody } from "@/types/company.types";
import { unmaskCnpj } from "@/lib/masks";

const BASE_URL = import.meta.env.VITE_API_URL 

export async function lookupCnpj(cnpj: string, signal?: AbortSignal): Promise<CompanyResponse> {
  const clean = unmaskCnpj(cnpj);
  const res = await fetch(`${BASE_URL}/cnpj/${clean}`, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!res.ok) {
    let body: ApiErrorBody | null = null;
    try {
      body = (await res.json()) as ApiErrorBody;
    } catch {
      // fallthrough
    }
    const code = body?.error?.code ?? "INTERNAL_SERVER_ERROR";
    const message = body?.error?.message ?? "Erro ao consultar CNPJ";
    throw new ApiError(code, message, res.status, body?.error?.details);
  }

  const envelope = (await res.json()) as SuccessEnvelope<CompanyResponse>;
  return envelope.data;
}
