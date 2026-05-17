import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./section-label";

type Props = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  description?: string | null;
  hint?: string | null;
  variant?: "tile" | "row";
  mono?: boolean;
};

export function InfoItem({
  icon: Icon,
  label,
  value,
  description,
  hint,
  variant = "row",
  mono = false,
}: Props) {
  const isTile = variant === "tile";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isTile
          ? "rounded-xl bg-surface p-3 transition hover:bg-surface/70"
          : "py-3",
      )}
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-surface text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <SectionLabel>{label}</SectionLabel>
        <p
          className={cn(
            "mt-0.5 break-words text-sm font-medium text-foreground",
            mono && "font-mono",
          )}
        >
          {value}
        </p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {hint && (
          <p className="mt-1 text-xs italic text-brand-primary">{hint}</p>
        )}
      </div>
    </div>
  );
}
