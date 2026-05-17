export function DotGridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-15"
      style={{
        backgroundImage: "radial-gradient(#6B62D1 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        backgroundPosition: "center top",
        maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
      }}
    />
  );
}
