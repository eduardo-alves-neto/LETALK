import type { CompanyResponse } from "@/types/company.types";
import type { LeadFormData } from "@/schemas/form.schema";
import { CompanyHeaderCard } from "./company-header-card";
import { LeadDataCard } from "./lead-data-card";
import { StrategicDataCard } from "./strategic-data-card";
import { ContactLocationCard } from "./contact-location-card";
import { ComplementaryDataCard } from "./complementary-data-card";

interface ResultContainerProps {
  data: CompanyResponse;
  lead: LeadFormData;
}

export function ResultContainer({ data, lead }: ResultContainerProps) {
  return (
    <div className="space-y-5 animate-fade-in-up">
      <CompanyHeaderCard company={data.company} cnpj={data.cnpj} />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
        <LeadDataCard lead={lead} />
        <StrategicDataCard company={data.company} activity={data.activity} />
      </div>

      <ContactLocationCard contact={data.contact} location={data.location} />

      <ComplementaryDataCard
        partners={data.partners}
        secondaryCnaes={data.activity.secondary}
      />
    </div>
  );
}
