import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, error, id, className, required, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <input
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        className={cn(
          "h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground transition outline-none",
          "placeholder:text-muted-foreground/70",
          "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20",
          className,
        )}
        {...rest}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
});
