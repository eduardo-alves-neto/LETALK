import { ERROR_CODES, type ErrorCode } from "./error-codes";

export const ERROR_MESSAGES: Record<
  ErrorCode,
  { title: string; message: string }
> = {
  [ERROR_CODES.INVALID_CNPJ]: {
    title: "CNPJ inválido",
    message: "Verifique os dígitos e tente novamente.",
  },
  [ERROR_CODES.VALIDATION_ERROR]: {
    title: "Dados inválidos",
    message: "Confira os campos do formulário.",
  },
  [ERROR_CODES.CNPJ_NOT_FOUND]: {
    title: "CNPJ não encontrado",
    message: "Este CNPJ não consta na base da Receita Federal.",
  },
  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: {
    title: "Serviço indisponível",
    message:
      "A Receita Federal está fora do ar. Tente novamente em alguns instantes.",
  },
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: {
    title: "Algo deu errado",
    message: "Erro inesperado. Tente novamente em instantes.",
  },
  [ERROR_CODES.NETWORK_ERROR]: {
    title: "Sem conexão com o servidor",
    message:
      "Não foi possível alcançar o backend. Verifique sua conexão ou tente novamente em instantes.",
  },
  [ERROR_CODES.UNKNOWN]: {
    title: "Algo deu errado",
    message: "Erro inesperado. Tente novamente em instantes.",
  },
};
