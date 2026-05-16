import axios, { AxiosError } from "axios";
import { IBrasilApiCnpjResponse } from "../types/brasilapi.types";
import { CnpjNotFoundError, ExternalServiceError } from "../utils/app-error";

const BRASIL_API_BASE_URL = "https://brasilapi.com.br/api/cnpj/v1";
const REQUEST_TIMEOUT_MS = 10_000;

const httpClient = axios.create({
  baseURL: BRASIL_API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
    "User-Agent": "letalk-cnpj-challenge/1.0",
  },
});

export async function fetchCnpjFromBrasilApi(cnpj: string): Promise<IBrasilApiCnpjResponse> {
  try {
    const response = await httpClient.get<IBrasilApiCnpjResponse>(`/${cnpj}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new CnpjNotFoundError("CNPJ não encontrado na base da Receita Federal");
      }

      if (error.code === "ECONNABORTED") {
        throw new ExternalServiceError("Tempo de resposta excedido ao consultar BrasilAPI");
      }

      if (error.response && error.response.status >= 500) {
        throw new ExternalServiceError("BrasilAPI temporariamente indisponível");
      }

      if (!error.response) {
        throw new ExternalServiceError("Erro de conexão com BrasilAPI");
      }
    }

    throw error;
  }
}
