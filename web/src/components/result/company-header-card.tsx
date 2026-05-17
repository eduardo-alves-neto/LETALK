import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import type { CompanyResponse } from "@/types/company.types";
import {
  computeYearsSince,
  currentTaxRegime,
  formatCurrencyBRL,
  formatDateBR,
} from "@/lib/utils";
import { SectionLabel } from "./section-label";

export interface CompanyHeaderCardProps {
  company: CompanyResponse["company"];
  cnpj: string;
}

type StatusTone = "success" | "destructive" | "warning";

const STATUS_STYLES: Record<StatusTone, { pill: string; dot: string }> = {
  success: { pill: "bg-success/10 text-success", dot: "bg-success" },
  destructive: {
    pill: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
  warning: { pill: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
};

export function CompanyHeaderCard({ company, cnpj }: CompanyHeaderCardProps) {
  const companyAge = computeYearsSince(company.foundedAt);
  const status = STATUS_STYLES[getStatusTone(company.statusDescription)];

  const kpis = [
    {
      label: "Idade",
      value:
        companyAge > 0
          ? `${companyAge} ${companyAge === 1 ? "ano" : "anos"}`
          : "—",
    },
    { label: "Porte", value: company.sizeDescription },
    { label: "Regime", value: currentTaxRegime(company.taxRegimeHistory) },
    { label: "Capital Social", value: formatCurrencyBRL(company.shareCapital) },
  ];

  return (
    <Card className="border-l-4 border-l-brand-primary p-0">
      <div className="flex flex-col gap-4 px-6 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:pt-7">
        <div className="min-w-0 flex-1">
          <SectionLabel>01 · Identificação</SectionLabel>
          <h2 className="mt-1 break-words text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {company.tradeName || company.name}
          </h2>
          {company.tradeName && company.tradeName !== company.name && (
            <p className="mt-1 text-sm text-muted-foreground">{company.name}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            Aberta em {formatDateBR(company.foundedAt)}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="font-mono text-sm text-foreground">
            {cnpjValidator.format(cnpj)}
          </p>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Badge
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${status.pill}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {company.statusDescription.toUpperCase()}
            </Badge>
            {company.branchLabel && (
              <Badge className="rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground">
                {company.branchLabel}
              </Badge>
            )}
            {company.isMei && (
              <Badge className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs text-brand-primary">
                MEI
              </Badge>
            )}
            {company.isSimples && (
              <Badge className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs text-brand-primary">
                Simples Nacional
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-surface/50 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="px-4 py-3 sm:px-6 sm:py-4">
            <SectionLabel>{kpi.label}</SectionLabel>
            <p className="mt-1 text-sm font-medium text-foreground">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function getStatusTone(status: string): StatusTone {
  const s = status.toLowerCase();
  if (s.startsWith("ativ")) return "success";
  if (s.startsWith("inativ") || s.startsWith("baix") || s.startsWith("suspens"))
    return "destructive";
  return "warning";
}
