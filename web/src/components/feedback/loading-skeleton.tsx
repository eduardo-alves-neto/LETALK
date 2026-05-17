import { useEffect, useState } from "react";

export function LoadingSkeleton() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-5">
      <div className="animate-pulse space-y-5">
        <div className="h-32 rounded-2xl bg-surface" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-48 rounded-2xl bg-surface" />
          <div className="h-48 rounded-2xl bg-surface" />
        </div>
        <div className="h-24 rounded-2xl bg-surface" />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {slow
          ? "Esse é um servidor gratuito, pode demorar um pouco..."
          : "Consultando Receita Federal e enriquecendo dados..."}
      </p>
    </div>
  );
}
