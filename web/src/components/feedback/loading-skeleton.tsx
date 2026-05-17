export function LoadingSkeleton() {
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
        {"Consultando Receita Federal e enriquecendo dados..."}
      </p>
    </div>
  );
}
