import axios, { AxiosError, AxiosInstance } from "axios";
import { BrasilApiCnpjResponse } from "../types/brasilapi.types";
import { CnpjNotFoundError, ExternalServiceError } from "../utils/app-error";
import { env } from "../config/env";

const httpClient: AxiosInstance = axios.create({
  baseURL: env.BRASIL_API_BASE_URL,
  timeout: env.BRASIL_API_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
  },
});

export async function fetchCnpjFromBrasilApi(cnpj: string): Promise<BrasilApiCnpjResponse> {
  try {
    const response = await httpClient.get<BrasilApiCnpjResponse>(`/${cnpj}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === 404) {
        throw new CnpjNotFoundError("CNPJ não encontrado na base da Receita Federal");
      }

      if (error.code === "ECONNABORTED") {
        throw new ExternalServiceError("Tempo de resposta excedido ao consultar BrasilAPI");
      }

      if (status && status >= 500) {
        throw new ExternalServiceError("BrasilAPI temporariamente indisponível");
      }

      if (!error.response) {
        throw new ExternalServiceError("Erro de conexão com BrasilAPI");
      }
    }
    throw error;
  }
}
