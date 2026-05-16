export interface IBrasilApiPartner {
  nome_socio: string;
  qualificacao_socio: string;
  faixa_etaria: string | null;
  data_entrada_sociedade: string;
  cnpj_cpf_do_socio: string | null;
  identificador_de_socio: number;
  nome_representante_legal: string | null;
  qualificacao_representante_legal: string | null;
}

export interface IBrasilApiCnpjResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  situacao_cadastral: number;
  descricao_situacao_cadastral: string;
  data_situacao_cadastral: string;
  motivo_situacao_cadastral: number;
  data_inicio_atividade: string;
  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  cnaes_secundarios: Array<{
    codigo: number;
    descricao: string;
  }>;
  natureza_juridica: string;
  porte: string;
  descricao_porte: string;
  opcao_pelo_simples: boolean | null;
  data_opcao_pelo_simples: string | null;
  opcao_pelo_mei: boolean | null;
  data_opcao_pelo_mei: string | null;
  qualificacao_do_responsavel: number;
  capital_social: number;
  ente_federativo_responsavel: string;

  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  ddd_telefone_1: string | null;
  ddd_telefone_2: string | null;
  email: string | null;

  qsa?: IBrasilApiPartner[];
}
