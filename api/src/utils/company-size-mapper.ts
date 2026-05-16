import { ICompanySize } from "../types/company.types";

const SIZE_LABEL_MAP: Record<string, string> = {
  "00": "Não informado",
  "01": "Microempresa (ME)",
  "03": "Empresa de Pequeno Porte (EPP)",
  "05": "Empresa de Médio ou Grande Porte",
  ME: "Microempresa (ME)",
  EPP: "Empresa de Pequeno Porte (EPP)",
  DEMAIS: "Empresa de Médio ou Grande Porte",
};

export function mapCompanySize(code: string): ICompanySize {
  return {
    code,
    label: SIZE_LABEL_MAP[code] ?? "Porte desconhecido",
  };
}
