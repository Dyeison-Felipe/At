/* eslint-disable @typescript-eslint/ban-types */
export type CpjDataType = {
  abertura: string;
  situacao: string;
  tipo: string;
  nome: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: Ativides[];
  atividades_secundarias: Ativides[];
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  email: string;
  telefone: string;
  data_situacao: string;
  cnpj: string;
  ultima_atualizacao: string;
  status: string;
  fantasia: string;
  complemento: string;
  efr: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  capital_social: string;
  qsa: string;
  simples: RegimeTributario;
  simei: RegimeTributario;
  extra: {};
  billing: {
    free: boolean;
    database: boolean;
  };
};

export type RegimeTributario = {
  optante: boolean;
  data_opcao: string;
  data_exclusao: string;
  ultima_atualizacao: string;
};

export type Ativides = {
  code: string;
  text: string;
};

export interface CnpjData {
  findDataCnpj(cnpj: string): Promise<CpjDataType>;
}
