import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { lazy, Suspense } from "react";
import type { CompanyResponse } from "@/types/company.types";
import type { LeadFormData } from "@/schemas/form.schema";

const PdfDownloadButton = lazy(() =>
  import("../pdf/PdfDownloadButton").then((m) => ({
    default: m.PdfDownloadButton,
  }))
);

interface CompactSearchBarProps {
  companyName: string;
  data: CompanyResponse;
  lead: LeadFormData;
  onNewSearch: () => void;
}

export function CompactSearchBar({
  companyName,
  data,
  lead,
  onNewSearch,
}: CompactSearchBarProps) {
  return (
    <section className="mb-6 flex items-center justify-between gap-3 rounded-2xl bg-surface px-5 py-4 animate-fade-in">
      <Button
        variant="ghost"
        onClick={onNewSearch}
        className="shrink-0 text-sm transition hover:text-brand-primary cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Nova consulta
      </Button>

      <div className="flex min-w-0 items-center gap-4">
        <span className="hidden min-w-0 truncate text-sm text-muted-foreground sm:inline">
          Lead qualificado:{" "}
          <strong className="text-foreground">{companyName}</strong>
        </span>
        <Suspense
          fallback={
            <Button variant="outline" size="sm" disabled className="gap-2">
              Carregando...
            </Button>
          }
        >
          <PdfDownloadButton data={data} lead={lead} />
        </Suspense>
      </div>
    </section>
  );
}
