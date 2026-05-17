import { FolderGit } from "lucide-react";

const GITHUB_URL = "https://github.com/eduardo-alves-neto/LETALK";

export function Header() {
  return (
    <header className="relative z-10 border-b border-border bg-card/70 backdrop-blur">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <img src="/logo-letalk.webp" alt="Logo" className="h-7 w-19" />
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className=" flex gap-2 text-xs font-medium text-muted-foreground hover:text-brand-primary"
        >
          <FolderGit className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </header>
  );
}
