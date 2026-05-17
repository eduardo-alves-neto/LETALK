import { ArrowLeft } from "lucide-react";

export function CompactSearchBar({ companyName, onNewSearch }: { companyName: string; onNewSearch: () => void }) {
  return (
    <section className="mb-6 flex items-center justify-between rounded-2xl bg-surface px-5 py-4 animate-fade-in">
      <button
        onClick={onNewSearch}
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-brand-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Nova busca
      </button>
      <span className="text-sm text-muted-foreground">
        Lead enriquecido: <strong className="text-foreground">{companyName}</strong>
      </span>
    </section>
  );
}
