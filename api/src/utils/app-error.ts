export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidCnpjError extends AppError {
  constructor(message = "CNPJ inválido") {
    super(message, 400, "INVALID_CNPJ");
  }
}

export class CnpjNotFoundError extends AppError {
  constructor(message = "CNPJ não encontrado") {
    super(message, 404, "CNPJ_NOT_FOUND");
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = "Serviço externo indisponível") {
    super(message, 502, "EXTERNAL_SERVICE_ERROR");
  }
}
