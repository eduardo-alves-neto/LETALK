import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FormIntro } from "@/components/hero/form-intro";
import { CompactSearchBar } from "@/components/hero/compact-search-bar";
import { LeadForm } from "@/components/form/lead-form";
import { ResultContainer } from "@/components/result/result-container";
import { LoadingSkeleton } from "@/components/feedback/loading-skeleton";
import { Toaster } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCnpjLookup } from "@/hooks/use-cnpj-lookup";

function App() {
  const {
    mutate: search,
    reset,
    isPending,
    isSuccess,
    data,
    variables,
  } = useCnpjLookup();

  return (
    <ScrollArea className="h-screen w-full bg-card">
      <div className="relative flex min-h-screen flex-col">
        <DotGridBackground />
        <Header />

        <main className="container relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 py-8  sm:px-6">
          {isSuccess ? (
            <CompactSearchBar
              companyName={data.company.tradeName ?? data.company.name}
              onNewSearch={reset}
            />
          ) : (
            <div className="grid items-start gap-8 py-8 lg:grid-cols-2 lg:gap-12 lg:py-16">
              <FormIntro />
              <LeadForm onSubmit={search} isPending={isPending} />
            </div>
          )}

          {isPending && (
            <div className="mt-8">
              <LoadingSkeleton />
            </div>
          )}

          {isSuccess && variables && (
            <ResultContainer data={data} lead={variables} />
          )}
        </main>

        <Footer />
      </div>
      <Toaster position="bottom-left" richColors />
    </ScrollArea>
  );
}

export default App;
