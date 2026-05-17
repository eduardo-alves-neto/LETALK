import { Card } from "@/components/ui/card";
import { Building, Code, Receipt, Scale } from "lucide-react";
import type { CompanyResponse } from "@/types/company.types";
import { InfoItem } from "./info-item";
import { SectionHeading, SectionLabel } from "./section-label";
import { currentTaxRegime, formatCnae, segmentFromCnae } from "@/lib/utils";

interface StrategicDataCardProps {
  company: CompanyResponse["company"];
  activity: CompanyResponse["activity"];
}

export function StrategicDataCard({
  company,
  activity,
}: StrategicDataCardProps) {
  const segment = segmentFromCnae(activity.main.code);

  return (
    <Card className="p-6 sm:p-8">
      <SectionHeading
        eyebrow="03 · Atividade econômica"
        title="Dados estratégicos"
        className="mb-5"
      />

      <div className="mb-5 flex items-start gap-4 rounded-xl bg-brand-primary/5 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
          <Code className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionLabel>CNAE Principal</SectionLabel>
          <p className="mt-1 font-mono text-base font-medium text-foreground">
            {formatCnae(activity.main.code)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {activity.main.description}
          </p>
        </div>
        <div className="hidden shrink-0 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary sm:block">
          {segment}
        </div>
      </div>

      <div className="divide-y divide-border">
        <InfoItem icon={Building} label="Segmento" value={segment} />
        <InfoItem
          icon={Scale}
          label="Natureza Jurídica"
          value={company.legalNature}
        />
        <InfoItem
          icon={Receipt}
          label="Regime Tributário"
          value={currentTaxRegime(company.taxRegimeHistory)}
        />
      </div>
    </Card>
  );
}
