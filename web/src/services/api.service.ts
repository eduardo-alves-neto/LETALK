import {
  ApiError,
  type ApiErrorBody,
  type CompanyResponse,
  type SuccessEnvelope,
} from "@/types/company.types";
import { ERROR_CODES } from "@/constants/error-codes";

const baseUrl = import.meta.env.VITE_API_URL;

export class SearchDocument {
  static async byCnpj(cnpj: string): Promise<CompanyResponse> {
    let res: Response;
    try {
      res = await fetch(`${baseUrl}/cnpj/${cnpj}`, {
        headers: { Accept: "application/json" },
      });
    } catch {
      throw new ApiError(ERROR_CODES.NETWORK_ERROR, 0);
    }

    const body = await res.json();

    if (!res.ok) {
      const { error } = body as ApiErrorBody;
      throw new ApiError(error.code, res.status, error.details);
    }

    return (body as SuccessEnvelope<CompanyResponse>).data;
  }
}
