import { BrasilApiCnpjResponse, BrasilApiPartner } from "../types/brasilapi.types";
import { CompanyPartner, CompanyResponse } from "../types/company.types";

export function transformBrasilApiResponse(raw: BrasilApiCnpjResponse): CompanyResponse {
  return {
    cnpj: normalizeCnpj(raw.cnpj),
    company: {
      name: raw.razao_social,
      tradeName: raw.nome_fantasia ?? null,
      statusCode: raw.situacao_cadastral,
      statusDescription: raw.descricao_situacao_cadastral,
      branchCode: raw.identificador_matriz_filial ?? null,
      branchLabel: raw.descricao_identificador_matriz_filial ?? null,
      foundedAt: raw.data_inicio_atividade,
      sizeCode: raw.codigo_porte,
      sizeDescription: raw.descricao_porte,
      legalNature: raw.natureza_juridica,
      shareCapital: raw.capital_social,
      isMei: raw.opcao_pelo_mei,
      isSimples: raw.opcao_pelo_simples,
      taxRegimeHistory:
        raw.regime_tributario?.map((r) => ({
          year: r.ano,
          taxation: r.forma_de_tributacao,
        })) ?? [],
    },
    activity: {
      main: { code: raw.cnae_fiscal, description: raw.cnae_fiscal_descricao },
      secondary: raw.cnaes_secundarios.map((c) => ({
        code: c.codigo,
        description: c.descricao,
      })),
    },
    location: {
      zipCode: raw.cep,
      streetType: raw.descricao_tipo_de_logradouro ?? null,
      street: raw.logradouro ?? "",
      number: raw.numero ?? "",
      complement: raw.complemento ?? "",
      neighborhood: raw.bairro ?? "",
      city: raw.municipio ?? "",
      state: raw.uf,
      country: raw.pais ?? null,
    },
    contact: {
      phone: raw.ddd_telefone_1 ?? null,
      secondaryPhone: raw.ddd_telefone_2 ?? null,
      email: raw.email ?? null,
    },
    partners: (raw.qsa ?? []).map(mapPartner),
  };
}

function mapPartner(p: BrasilApiPartner): CompanyPartner {
  const rep = p.nome_representante_legal?.trim();
  return {
    name: p.nome_socio,
    role: p.qualificacao_socio,
    ageRange: p.faixa_etaria ?? null,
    joinedAt: p.data_entrada_sociedade,
    taxId: p.cnpj_cpf_do_socio ?? null,
    legalRepresentative: rep && rep.length > 0 ? rep : null,
  };
}

export function normalizeCnpj(input: string | null | undefined): string {
  return (input ?? "").replace(/\D/g, "");
}
