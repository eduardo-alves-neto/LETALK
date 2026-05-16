import "dotenv/config";
import { z } from "zod";

const BRASIL_API_BASE_URL_DEFAULT = "https://brasilapi.com.br/api/cnpj/v1";
const BRASIL_API_TIMEOUT_MS_DEFAULT = 10_000;
const PORT_DEFAULT = 3333;

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(PORT_DEFAULT),
  CORS_ORIGINS: z.string().optional(),
  BRASIL_API_BASE_URL: z.url().default(BRASIL_API_BASE_URL_DEFAULT),
  BRASIL_API_TIMEOUT_MS: z.coerce.number().int().positive().default(BRASIL_API_TIMEOUT_MS_DEFAULT),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("[env] Invalid environment variables:", z.treeifyError(parsed.error).properties);
  process.exit(1);
}

export const env = parsed.data;
