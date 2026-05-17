import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { LeadReportPDF } from "./LeadReportPDF";
import { Button } from "@/components/ui/button";
import type { CompanyResponse } from "@/types/company.types";
import type { LeadFormData } from "@/schemas/form.schema";

type Props = {
  data: CompanyResponse;
  lead: LeadFormData;
};

export function PdfDownloadButton({ data, lead }: Props) {
  const filename = `lead-${data.cnpj.replace(/\D/g, "")}-${Date.now()}.pdf`;

  return (
    <PDFDownloadLink
      document={<LeadReportPDF data={data} lead={lead} />}
      fileName={filename}
    >
      {({ loading }) => (
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          className="gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          {loading ? "Gerando..." : "Exportar PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
