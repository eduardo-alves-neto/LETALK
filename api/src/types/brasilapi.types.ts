export interface BrasilApiPartner {
  pais: string | null;
  nome_socio: string;
  codigo_pais: number | null;
  faixa_etaria: string | null;
  cnpj_cpf_do_socio: string | null;
  qualificacao_socio: string;
  codigo_faixa_etaria: number | null;
  data_entrada_sociedade: string;
  identificador_de_socio: number;
  cpf_representante_legal: string | null;
  nome_representante_legal: string | null;
  codigo_qualificacao_socio: number | null;
  qualificacao_representante_legal: string | null;
  codigo_qualificacao_representante_legal: number | null;
}

export interface BrasilApiSecondaryCnae {
  codigo: number;
  descricao: string;
}

export interface BrasilApiTaxRegime {
  ano: number;
  cnpj_da_scp: string | null;
  forma_de_tributacao: string;
  quantidade_de_escrituracoes: number;
}

export interface BrasilApiCnpjResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;

  situacao_cadastral: number;
  descricao_situacao_cadastral: string;
  data_situacao_cadastral: string;
  motivo_situacao_cadastral: number;
  descricao_motivo_situacao_cadastral?: string;

  data_inicio_atividade: string;

  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  cnaes_secundarios: BrasilApiSecondaryCnae[];

  natureza_juridica: string;
  codigo_natureza_juridica?: number;

  porte: string;
  codigo_porte: number;
  descricao_porte: string;

  opcao_pelo_simples: boolean | null;
  data_opcao_pelo_simples: string | null;
  data_exclusao_do_simples?: string | null;
  opcao_pelo_mei: boolean | null;
  data_opcao_pelo_mei: string | null;
  data_exclusao_do_mei?: string | null;

  regime_tributario?: BrasilApiTaxRegime[];

  qualificacao_do_responsavel: number;
  capital_social: number;
  ente_federativo_responsavel: string;

  identificador_matriz_filial?: number;
  descricao_identificador_matriz_filial?: string;

  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  descricao_tipo_de_logradouro?: string;

  pais?: string | null;
  codigo_pais?: number | null;

  ddd_telefone_1: string | null;
  ddd_telefone_2: string | null;
  ddd_fax?: string | null;

  email: string | null;

  qsa?: BrasilApiPartner[];

  situacao_especial?: string;
  data_situacao_especial?: string | null;
  nome_cidade_no_exterior?: string;
  codigo_municipio?: number;
  codigo_municipio_ibge?: number;
}
