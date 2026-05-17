import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./pdf-styles";
import {
  computeYearsSince,
  currentTaxRegime,
  formatCnae,
  formatCurrencyBRL,
  formatDateBR,
  maskPhone,
  segmentFromCnae,
} from "@/lib/utils";
import { cnpj as cnpjFormatter } from "cpf-cnpj-validator";
import type { CompanyResponse } from "@/types/company.types";
import type { LeadFormData } from "@/schemas/form.schema";

type Props = {
  data: CompanyResponse;
  lead: LeadFormData;
};

function formatDateTimeBR(date: Date): string {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPhone(raw: string): string {
  return maskPhone(raw.replace(/\D/g, ""));
}

function Row({
  label,
  value,
  shaded,
}: {
  label: string;
  value: string;
  shaded?: boolean;
}) {
  return (
    <View style={shaded ? styles.rowShaded : styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || "—"}</Text>
    </View>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionBar} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionDivider} />
    </>
  );
}

export function LeadReportPDF({ data, lead }: Props) {
  const now = new Date();
  const { company, activity, location, contact } = data;

  const segment = segmentFromCnae(activity.main.code);
  const age = computeYearsSince(company.foundedAt);
  const taxRegime = currentTaxRegime(company.taxRegimeHistory);

  const streetParts = [
    [location.streetType, location.street].filter(Boolean).join(" "),
    location.number,
  ].filter(Boolean);

  return (
    <Document
      title={`Lead Qualificado - ${company.tradeName ?? company.name}`}
      author="CNPJ Lookup"
      subject="Relatório de Qualificação de Lead"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <Text style={styles.logo}>CNPJ Lookup</Text>
          <Text style={styles.generatedAt}>
            Gerado em {formatDateBR(now.toISOString().slice(0, 10))}
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Relatório de Qualificação de Lead</Text>
          <Text style={styles.subtitle}>
            Análise gerada em {formatDateTimeBR(now)}
          </Text>

          <View style={styles.companyBox}>
            <View style={styles.companyBoxTop}>
              <Text style={styles.companyBoxName}>
                {company.tradeName || company.name}
              </Text>
              <Text style={styles.statusPill}>
                {company.statusDescription.toUpperCase()}
              </Text>
            </View>
            <View style={styles.companyBoxMeta}>
              {company.tradeName && company.tradeName !== company.name && (
                <Text style={styles.companyBoxMetaItem}>
                  <Text style={styles.companyBoxMetaBold}>Razão: </Text>
                  {company.name}
                </Text>
              )}
              <Text style={styles.companyBoxMetaItem}>
                <Text style={styles.companyBoxMetaBold}>CNPJ: </Text>
                {cnpjFormatter.format(data.cnpj)}
              </Text>
              <Text style={styles.companyBoxMetaItem}>
                <Text style={styles.companyBoxMetaBold}>Desde: </Text>
                {formatDateBR(company.foundedAt)} ({age}{" "}
                {age === 1 ? "ano" : "anos"})
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <SectionHead title="Contato do Lead" />
            <Row label="Nome" value={lead.name ?? ""} />
            <Row label="Email" value={lead.email ?? ""} shaded />
            <Row label="Telefone" value={lead.phone ? formatPhone(lead.phone) : ""} />
            {lead.role && <Row label="Cargo" value={lead.role} shaded />}
          </View>

          <View style={styles.section}>
            <SectionHead title="Dados da Empresa" />
            <Row label="Razão Social" value={company.name} />
            {company.tradeName && company.tradeName !== company.name && (
              <Row label="Nome Fantasia" value={company.tradeName} shaded />
            )}
            <Row label="Situação" value={company.statusDescription} shaded={!company.tradeName || company.tradeName === company.name} />
            <Row label="Natureza Jurídica" value={company.legalNature} />
            <Row label="Capital Social" value={formatCurrencyBRL(company.shareCapital)} shaded />
            {company.isMei && <Row label="MEI" value="Sim" />}
            {company.isSimples && <Row label="Simples Nacional" value="Sim" shaded />}
          </View>

          <View style={styles.section}>
            <SectionHead title="Dados Estratégicos" />
            <Row label="Segmento" value={segment} />
            <Row label="Porte" value={company.sizeDescription || "Não informado"} shaded />
            <Row label="Regime Tributário" value={taxRegime} />
            <Row
              label="CNAE Principal"
              value={`${formatCnae(activity.main.code)} — ${activity.main.description}`}
              shaded
            />
          </View>

          <View style={styles.section}>
            <SectionHead title="Localização e Contato Institucional" />
            <View style={styles.row}>
              <Text style={styles.label}>Endereço:</Text>
              <View style={styles.addressBlock}>
                {streetParts.length > 0 && (
                  <Text style={styles.addressLine}>{streetParts.join(", ")}</Text>
                )}
                {location.complement ? (
                  <Text style={styles.addressLineMuted}>{location.complement}</Text>
                ) : null}
                {location.neighborhood ? (
                  <Text style={styles.addressLineMuted}>{location.neighborhood}</Text>
                ) : null}
                <Text style={styles.addressLineMuted}>
                  {location.city} / {location.state}
                </Text>
                <Text style={styles.addressLineMuted}>
                  CEP {location.zipCode.replace(/^(\d{5})(\d)/, "$1-$2")}
                </Text>
              </View>
            </View>
            {contact.phone && (
              <Row label="Telefone" value={formatPhone(contact.phone)} shaded />
            )}
            {contact.secondaryPhone && (
              <Row label="Tel. Secundário" value={formatPhone(contact.secondaryPhone)} />
            )}
            {contact.email && (
              <Row label="Email" value={contact.email} shaded={!!contact.secondaryPhone} />
            )}
            {!contact.phone && !contact.email && (
              <Row label="Contato" value="Não informado" shaded />
            )}
          </View>

          {activity.secondary.length > 0 && (
            <View style={styles.section} wrap={false}>
              <SectionHead title="CNAEs Secundários" />
              {activity.secondary.map((cnae, i) => (
                <View key={i} style={styles.cnaeItem}>
                  <Text style={styles.cnaeCode}>{formatCnae(cnae.code)}</Text>
                  <Text style={styles.cnaeDescription}>{cnae.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.footer} fixed>
          Documento gerado por CNPJ Lookup — Dados extraídos da Receita Federal via BrasilAPI
        </Text>
      </Page>
    </Document>
  );
}
