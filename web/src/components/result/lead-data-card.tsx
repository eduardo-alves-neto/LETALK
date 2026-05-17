import { Card } from "@/components/ui/card";
import { User, Mail, Phone, Briefcase } from "lucide-react";
import { InfoItem } from "./info-item";
import { SectionHeading } from "./section-label";
import type { LeadFormData } from "@/schemas/form.schema";

const FALBACK_VALUE = "Não informado";

export function LeadDataCard({ lead }: { lead: LeadFormData }) {
  return (
    <Card className="h-full p-6 sm:p-8">
      <SectionHeading eyebrow="02 · Lead" title="Dados do contato" />
      <p className="mb-3 mt-1 text-xs text-muted-foreground">
        Informados no formulário.
      </p>
      <div className="divide-y divide-border">
        <InfoItem icon={User} label="Nome" value={lead.name || FALBACK_VALUE} />
        <InfoItem
          icon={Mail}
          label="Email pessoal"
          value={lead.email || FALBACK_VALUE}
        />
        <InfoItem
          icon={Phone}
          label="Telefone pessoal"
          value={lead.phone || FALBACK_VALUE}
        />
        <InfoItem
          icon={Briefcase}
          label="Cargo"
          value={lead.role || FALBACK_VALUE}
        />
      </div>
    </Card>
  );
}
