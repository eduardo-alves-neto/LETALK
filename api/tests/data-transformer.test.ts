import { describe, it, expect } from "vitest";
import { transformBrasilApiResponse } from "../src/utils/data-transformer";
import { IBrasilApiCnpjResponse } from "../src/types/brasilapi.types";

const mockBrasilApiResponse: IBrasilApiCnpjResponse = {
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
  porte: "03",
  descricao_porte: "EMPRESA DE PEQUENO PORTE",
  opcao_pelo_simples: true,
  data_opcao_pelo_simples: "2018-03-15",
  opcao_pelo_mei: false,
  data_opcao_pelo_mei: null,
  qualificacao_do_responsavel: 0,
  capital_social: 100000,
  ente_federativo_responsavel: "",
  cep: "58700000",
  logradouro: "RUA DAS FLORES",
  numero: "123",
  complemento: "SALA 401",
  bairro: "CENTRO",
  municipio: "PATOS",
  uf: "PB",
  ddd_telefone_1: "83999999999",
  ddd_telefone_2: null,
  email: "contato@exemplo.com.br",
  qsa: [
    {
      nome_socio: "JOAO DA SILVA",
      qualificacao_socio: "Sócio-Administrador",
      faixa_etaria: "Entre 41 a 50 anos",
      data_entrada_sociedade: "2018-03-15",
      cnpj_cpf_do_socio: "***123456**",
      identificador_de_socio: 2,
      nome_representante_legal: "",
      qualificacao_representante_legal: "Não informada",
    },
  ],
};

describe("transformBrasilApiResponse", () => {
  it("formata o CNPJ", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.raw_cnpj).toBe("11.222.333/0001-81");
  });

  it("agrupa dados em company, activity, location, contact", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company).toBeDefined();
    expect(result.activity).toBeDefined();
    expect(result.location).toBeDefined();
    expect(result.contact).toBeDefined();
  });

  it("calcula a idade da empresa em anos", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    const expectedAge = new Date().getFullYear() - 2018;
    expect(result.company.age_years).toBe(expectedAge);
  });

  it("mapeia situação ATIVA com cor verde", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company.status.color).toBe("green");
    expect(result.company.status.label).toBe("Ativa");
  });

  it("identifica regime tributário como Simples Nacional", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.company.tax_regime).toBe("Simples Nacional");
  });

  it("mapeia sócios do QSA", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.partners).toHaveLength(1);
    expect(result.partners[0]).toEqual({
      name: "Joao da Silva",
      role: "Sócio-Administrador",
      age_range: "Entre 41 a 50 anos",
      joined_at: "2018-03-15",
      tax_id: "***123456**",
      legal_representative: null,
    });
  });

  it("retorna partners vazio quando QSA ausente", () => {
    const { qsa: _qsa, ...withoutQsa } = mockBrasilApiResponse;
    const result = transformBrasilApiResponse(withoutQsa);
    expect(result.partners).toEqual([]);
  });

  it("formata o telefone", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.contact.phone).toBe("(83) 99999-9999");
  });

  it("formata o CEP", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.location.zip_code).toBe("58700-000");
  });

  it("constrói o endereço completo", () => {
    const result = transformBrasilApiResponse(mockBrasilApiResponse);
    expect(result.location.full_address).toContain("Rua Das Flores");
    expect(result.location.full_address).toContain("Patos/PB");
    expect(result.location.full_address).toContain("58700-000");
  });
});
