import { ERROR_CODES, type ErrorCode } from "../constants/error-codes";

export interface AppErrorDetails {
  [field: string]: string[] | string | undefined;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: AppErrorDetails;

  constructor(message: string, statusCode: number, code: ErrorCode, details?: AppErrorDetails) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ValidationError extends AppError {
  constructor(message = "Dados inválidos", details?: AppErrorDetails) {
    super(message, 400, ERROR_CODES.VALIDATION_ERROR, details);
  }
}

export class InvalidCnpjError extends AppError {
  constructor(message = "CNPJ inválido", details?: AppErrorDetails) {
    super(message, 400, ERROR_CODES.INVALID_CNPJ, details);
  }
}

export class CnpjNotFoundError extends AppError {
  constructor(message = "CNPJ não encontrado") {
    super(message, 404, ERROR_CODES.CNPJ_NOT_FOUND);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = "Serviço externo indisponível") {
    super(message, 502, ERROR_CODES.EXTERNAL_SERVICE_ERROR);
  }
}
