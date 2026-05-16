import {
  IBrasilApiCnpjResponse,
  IBrasilApiPartner,
} from "../types/brasilapi.types";
import {
  ICompanyResponse,
  ICompanyStatus,
  IPartner,
  StatusColor,
} from "../types/company.types";
import { formatCnpj } from "./cnpj-validator";
import { mapCompanySize } from "./company-size-mapper";

export function transformBrasilApiResponse(
  raw: IBrasilApiCnpjResponse,
): ICompanyResponse {
  return {
    raw_cnpj: formatCnpj(raw.cnpj),

    company: {
      name: capitalizeWords(raw.razao_social),
      trade_name: raw.nome_fantasia ? capitalizeWords(raw.nome_fantasia) : null,
      status: mapStatus(raw.descricao_situacao_cadastral),
      age_years: calculateYearsSince(raw.data_inicio_atividade),
      founded_at: raw.data_inicio_atividade,
      size: mapCompanySize(raw.porte),
      tax_regime: mapTaxRegime(raw),
      legal_nature: raw.natureza_juridica,
      share_capital: raw.capital_social,
    },

    activity: {
      main: {
        code: formatCnaeCode(raw.cnae_fiscal),
        description: raw.cnae_fiscal_descricao,
      },
      secondary: raw.cnaes_secundarios.map((c) => ({
        code: formatCnaeCode(c.codigo),
        description: c.descricao,
      })),
    },

    location: {
      full_address: buildFullAddress(raw),
      zip_code: formatCep(raw.cep),
      street: raw.logradouro,
      number: raw.numero,
      complement: raw.complemento,
      neighborhood: raw.bairro,
      city: capitalizeWords(raw.municipio),
      state: raw.uf,
    },

    contact: {
      phone: formatPhone(raw.ddd_telefone_1),
      email: raw.email?.toLowerCase() ?? null,
    },

    partners: (raw.qsa ?? []).map(mapPartner),
  };
}

function mapPartner(p: IBrasilApiPartner): IPartner {
  const legalRep =
    p.nome_representante_legal && p.nome_representante_legal.trim().length > 0
      ? capitalizeWords(p.nome_representante_legal)
      : null;

  return {
    name: capitalizeWords(p.nome_socio),
    role: p.qualificacao_socio,
    age_range: p.faixa_etaria ?? null,
    joined_at: p.data_entrada_sociedade,
    tax_id: p.cnpj_cpf_do_socio ?? null,
    legal_representative: legalRep,
  };
}

function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function calculateYearsSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  return now.getFullYear() - start.getFullYear();
}

function mapStatus(description: string): ICompanyStatus {
  const code = description.toUpperCase();
  const colorMap: Record<string, StatusColor> = {
    ATIVA: "green",
    SUSPENSA: "yellow",
    INAPTA: "yellow",
    BAIXADA: "red",
    NULA: "red",
  };
  return {
    code,
    label: capitalizeWords(description),
    color: colorMap[code] ?? "gray",
  };
}

function mapTaxRegime(raw: IBrasilApiCnpjResponse): string {
  if (raw.opcao_pelo_mei) return "MEI";
  if (raw.opcao_pelo_simples) return "Simples Nacional";
  return "Lucro Real/Presumido";
}

function formatCnaeCode(code: number | string): string {
  const str = String(code).padStart(7, "0");
  return `${str.slice(0, 4)}-${str.slice(4, 5)}/${str.slice(5)}`;
}

function formatCep(cep: string): string {
  const digits = (cep ?? "").replace(/\D/g, "");
  return digits.length === 8 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : cep;
}

function formatPhone(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

function buildFullAddress(raw: IBrasilApiCnpjResponse): string {
  const parts = [
    raw.logradouro ? capitalizeWords(raw.logradouro) : "",
    raw.numero,
    raw.complemento ? capitalizeWords(raw.complemento) : "",
    raw.bairro ? capitalizeWords(raw.bairro) : "",
    `${capitalizeWords(raw.municipio)}/${raw.uf}`,
    formatCep(raw.cep),
  ].filter(Boolean);
  return parts.join(", ");
}
