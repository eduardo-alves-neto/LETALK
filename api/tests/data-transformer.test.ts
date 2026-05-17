import { describe, it, expect } from "vitest";
import { transformBrasilApiResponse } from "../src/utils/data-transformer";
import { BrasilApiCnpjResponse } from "../src/types/brasilapi.types";

const mockBrasilApiResponse: BrasilApiCnpjResponse = {
  cnpj: "11222333000181",
  razao_social: "EMPRESA EXEMPLO LTDA",
  nome_fantasia: "Exemplo",
  situacao_cadastral: 2,
  descricao_situacao_cadastral: "ATIVA",
  data_situacao_cadastral: "2020-01-01",
  motivo_situacao_cadastral: 0,
  data_inicio_atividade: "2018-03-15",
  cnae_fiscal: 6204000,
  cnae_fiscal_descricao: "Consultoria em tecnologia da informação",
  cnaes_secundarios: [],
  natureza_juridica: "Sociedade Empresária Limitada",
  porte: "EPP",
  codigo_porte: 3,
  descricao_porte: "EMPRESA DE PEQUENO PORTE",
  opcao_pelo_simples: true,
  data_opcao_pelo_simples: "2018-03-15",
  opcao_pelo_mei: false,
  data_opcao_pelo_mei: null,
  qualificacao_do_responsavel: 0,
  capital_social: 100000,
  ente_federativo_responsavel: "",
  identificador_matriz_filial: 1,
  descricao_identificador_matriz_filial: "MATRIZ",
  cep: "58700000",
  logradouro: "RUA DAS FLORES",
  numero: "123",
  complemento: "SALA 401",
  bairro: "CENTRO",
  municipio: "PATOS",
  uf: "PB",
  descricao_tipo_de_logradouro: "RUA",
  ddd_telefone_1: "83999999999",
  ddd_telefone_2: null,
  email: "contato@exemplo.com.br",
  regime_tributario: [
    {
      ano: 2022,
      cnpj_da_scp: null,
      forma_de_tributacao: "SIMPLES NACIONAL",
      quantidade_de_escrituracoes: 1,
    },
    {
      ano: 2023,
      cnpj_da_scp: null,
      forma_de_tributacao: "SIMPLES NACIONAL",
      quantidade_de_escrituracoes: 1,
    },
  ],
  qsa: [
    {
      pais: null,
      codigo_pais: null,
      nome_socio: "JOAO DA SILVA",
      qualificacao_socio: "Sócio-Administrador",
      codigo_qualificacao_socio: 49,
      faixa_etaria: "Entre 41 a 50 anos",
      codigo_faixa_etaria: 5,
      data_entrada_sociedade: "2018-03-15",
      cnpj_cpf_do_socio: "***123456**",
      identificador_de_socio: 2,
      cpf_representante_legal: "***000000**",
      nome_representante_legal: "",
      qualificacao_representante_legal: "Não informada",
      codigo_qualificacao_representante_legal: 0,
    },
  ],
};

describe("transformBrasilApiResponse", () => {
  it("retorna CNPJ normalizado em dígitos", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.cnpj).toBe("11222333000181");
  });

  it("agrupa dados em company, activity, location, contact", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company).toBeDefined();
    expect(result.activity).toBeDefined();
    expect(result.location).toBeDefined();
    expect(result.contact).toBeDefined();
  });

  it("mapeia status sem reformatar", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company.statusCode).toBe(2);
    expect(result.company.statusDescription).toBe("ATIVA");
  });

  it("mapeia regime tributário Simples", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company.isSimples).toBe(true);
    expect(result.company.isMei).toBe(false);
    expect(result.company.taxRegimeHistory).toHaveLength(2);
    expect(result.company.taxRegimeHistory[0]?.year).toBe(2022);
  });

  it("retorna isMei/isSimples null quando ausente", () => {
    const result = transformBrasilApiResponse({
      ...mockBrasilApiResponse,
      opcao_pelo_mei: null,
      opcao_pelo_simples: null,
    });
    expect(result.company.isMei).toBeNull();
    expect(result.company.isSimples).toBeNull();
  });

  it("mapeia porte sem reformatar", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company.sizeCode).toBe(3);
    expect(result.company.sizeDescription).toBe("EMPRESA DE PEQUENO PORTE");
  });

  it("mapeia sócios em camelCase sem capitalizar", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.partners).toHaveLength(1);
    expect(result.partners[0]).toEqual({
      name: "JOAO DA SILVA",
      role: "Sócio-Administrador",
      ageRange: "Entre 41 a 50 anos",
      joinedAt: "2018-03-15",
      taxId: "***123456**",
      legalRepresentative: null,
    });
  });

  it("retorna partners vazio quando QSA ausente", () => {
    const { qsa: _qsa, ...withoutQsa } = mockBrasilApiResponse;
    const result = transformBrasilApiResponse(withoutQsa);
    expect(result.partners).toEqual([]);
  });

  it("repassa telefone bruto", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.contact.phone).toBe("83999999999");
  });

  it("repassa CEP bruto", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.location.zipCode).toBe("58700000");
  });

  it("repassa endereço bruto em campos separados", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.location.street).toBe("RUA DAS FLORES");
    expect(result.location.city).toBe("PATOS");
    expect(result.location.state).toBe("PB");
  });

  it("mapeia matriz/filial sem reformatar", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company.branchCode).toBe(1);
    expect(result.company.branchLabel).toBe("MATRIZ");
  });
});
