import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCnae, formatDateBR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { CompanyResponse } from "@/types/company.types";
import { SectionHeading } from "./section-label";

interface ComplementaryDataCardProps {
  company: CompanyResponse["company"];
  partners: CompanyResponse["partners"];
  secondaryCnaes: CompanyResponse["activity"]["secondary"];
}

type TabKey = "cnaes" | "partners";

interface Tab {
  key: TabKey;
  label: string;
  count?: number;
  render: () => React.ReactNode;
}

export function ComplementaryDataCard({
  partners,
  secondaryCnaes,
}: ComplementaryDataCardProps) {
  const tabs: Tab[] = [];

  if (secondaryCnaes?.length) {
    tabs.push({
      key: "cnaes",
      label: "CNAEs secundários",
      count: secondaryCnaes.length,
      render: () => <CnaesTab cnaes={secondaryCnaes} />,
    });
  }
  if (partners?.length) {
    tabs.push({
      key: "partners",
      label: "Quadro societário",
      count: partners.length,
      render: () => <PartnersTab partners={partners} />,
    });
  }

  const [activeKey, setActiveKey] = useState<TabKey | undefined>(tabs[0]?.key);

  if (!tabs.length) return null;

  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return (
    <Card className="p-0">
      <div className="px-6 pt-6 sm:px-8 sm:pt-7">
        <SectionHeading
          eyebrow="05 · Dados complementares"
          title="Detalhes adicionais"
        />
      </div>

      <div className="mt-5 flex gap-1 border-b border-border px-6 sm:px-8 ">
        {tabs.map((t) => (
          <TabButton
            key={t.key}
            label={t.label}
            count={t.count}
            isActive={t.key === activeKey}
            onClick={() => setActiveKey(t.key)}
          />
        ))}
      </div>

      <div className="px-6 py-6 sm:px-8">{active.render()}</div>
    </Card>
  );
}

function TabButton({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 whitespace-nowrap px-3 py-3 text-sm font-medium transition cursor-pointer",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      {typeof count === "number" && (
        <Badge className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
          {count}
        </Badge>
      )}
      {isActive && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-primary" />
      )}
    </button>
  );
}

function CnaesTab({
  cnaes,
}: {
  cnaes: CompanyResponse["activity"]["secondary"];
}) {
  return (
    <ul className="divide-y divide-border">
      {cnaes.map((c) => (
        <li key={c.code} className="flex gap-3 py-3">
          <code className="shrink-0 font-mono text-xs text-muted-foreground">
            {formatCnae(c.code)}
          </code>
          <span className="text-sm text-foreground">{c.description}</span>
        </li>
      ))}
    </ul>
  );
}

function PartnersTab({ partners }: { partners: CompanyResponse["partners"] }) {
  return (
    <ul className="divide-y divide-border">
      {partners.map((p, i) => (
        <li key={`${p.name}-${i}`} className="flex flex-col gap-1 py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-foreground">
              {p.name}
            </span>
            <span className="text-xs text-muted-foreground">
              Entrada: {formatDateBR(p.joinedAt)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{p.role}</span>
        </li>
      ))}
    </ul>
  );
}
