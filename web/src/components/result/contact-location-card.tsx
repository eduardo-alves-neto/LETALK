import { Card } from "@/components/ui/card";
import { Phone, Mail, PhoneCall } from "lucide-react";
import type { CompanyContact, CompanyLocation } from "@/types/company.types";
import { InfoItem } from "./info-item";
import { SectionHeading, SectionLabel } from "./section-label";

interface ContactLocationCardProps {
  contact: CompanyContact;
  location: CompanyLocation;
}

export function ContactLocationCard({
  contact,
  location,
}: ContactLocationCardProps) {
  const zip = location.zipCode.replace(/^(\d{5})(\d)/, "$1-$2");
  const streetLine = [
    [location.streetType, location.street].filter(Boolean).join(" "),
    location.number,
  ]
    .filter(Boolean)
    .join(", ");
  const hasContact = contact.phone || contact.secondaryPhone || contact.email;

  return (
    <Card className="p-6 sm:p-8">
      <SectionHeading
        eyebrow="04 · Contato & localização"
        title="Dados do estabelecimento"
        className="mb-5"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <SectionLabel className="mb-3">Contato institucional</SectionLabel>
          {hasContact ? (
            <div className="divide-y divide-border">
              {contact.phone && (
                <InfoItem icon={Phone} label="Telefone" value={contact.phone} />
              )}
              {contact.secondaryPhone && (
                <InfoItem
                  icon={PhoneCall}
                  label="Telefone secundário"
                  value={contact.secondaryPhone}
                />
              )}
              {contact.email && (
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all hover:text-brand-primary"
                    >
                      {contact.email}
                    </a>
                  }
                />
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum contato disponível.
            </p>
          )}
        </section>

        <section className="md:border-l md:border-border md:pl-8">
          <SectionLabel className="mb-3">Endereço</SectionLabel>
          <div className="space-y-1.5 text-sm">
            {streetLine && <p className="text-foreground">{streetLine}</p>}
            {location.complement && (
              <p className="text-muted-foreground">{location.complement}</p>
            )}
            {location.neighborhood && (
              <p className="text-muted-foreground">{location.neighborhood}</p>
            )}
            <p className="text-muted-foreground">
              {location.city} / {location.state}
            </p>
            <p className="font-mono text-xs text-muted-foreground">CEP {zip}</p>
          </div>
        </section>
      </div>
    </Card>
  );
}
