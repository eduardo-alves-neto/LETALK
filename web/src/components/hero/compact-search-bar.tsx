import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface CompactSearchBarProps {
  companyName: string;
  onNewSearch: () => void;
}

export function CompactSearchBar({
  companyName,
  onNewSearch,
}: CompactSearchBarProps) {
  return (
    <section className="mb-6 flex items-center justify-between rounded-2xl bg-surface px-5 py-4 animate-fade-in">
      <Button
        variant="ghost"
        onClick={onNewSearch}
        className="text-sm transition hover:text-brand-primary cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Nova consulta
      </Button>
      <span className="text-sm text-muted-foreground">
        Lead qualificado:{" "}
        <strong className="text-foreground">{companyName}</strong>
      </span>
    </section>
  );
}
