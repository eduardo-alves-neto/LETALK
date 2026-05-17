import { Response } from "express";

export interface ResponseMeta {
  source?: string;
  fetchedAt?: string;
  [key: string]: unknown;
}

export interface SuccessEnvelope<T> {
  data: T;
  meta: ResponseMeta;
}

export interface ErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  meta: ResponseMeta = {},
  status = 200,
): Response {
  const envelope: SuccessEnvelope<T> = {
    data,
    meta: {
      fetchedAt: new Date().toISOString(),
      ...meta,
    },
  };
  return res.status(status).json(envelope);
}

export function buildErrorEnvelope(params: {
  code: string;
  message: string;
  details?: unknown;
}): ErrorEnvelope {
  return {
    error: {
      code: params.code,
      message: params.message,
      ...(params.details !== undefined ? { details: params.details } : {}),
    },
  };
}
