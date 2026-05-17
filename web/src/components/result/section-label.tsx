import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  as?: "p" | "dt" | "span";
  className?: string;
}

export function SectionLabel({
  children,
  as: Tag = "p",
  className,
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <h3 className="mt-1 text-base font-medium text-foreground">{title}</h3>
    </div>
  );
}
