import { describe, it, expect } from "vitest";
import {
  validateCnpj,
  normalizeCnpj,
  formatCnpj,
} from "../src/utils/cnpj-validator";

describe("validateCnpj", () => {
  it("aceita CNPJ válido com máscara", () => {
    const result = validateCnpj("11.222.333/0001-81");
    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("11222333000181");
  });

  it("aceita CNPJ válido sem máscara", () => {
    const result = validateCnpj("11222333000181");
    expect(result.valid).toBe(true);
  });

  it("rejeita CNPJ com dígito verificador errado", () => {
    const result = validateCnpj("11222333000100");
    expect(result.valid).toBe(false);
  });

  it("rejeita CNPJ com todos dígitos iguais", () => {
    expect(validateCnpj("00000000000000").valid).toBe(false);
    expect(validateCnpj("11111111111111").valid).toBe(false);
  });

  it("rejeita CNPJ com menos de 14 dígitos", () => {
    expect(validateCnpj("123").valid).toBe(false);
  });

  it("rejeita string vazia", () => {
    expect(validateCnpj("").valid).toBe(false);
  });
});

describe("normalizeCnpj", () => {
  it("remove caracteres não-numéricos", () => {
    expect(normalizeCnpj("11.222.333/0001-81")).toBe("11222333000181");
  });
});

describe("formatCnpj", () => {
  it("formata CNPJ com a máscara padrão", () => {
    expect(formatCnpj("11222333000181")).toBe("11.222.333/0001-81");
  });
});
