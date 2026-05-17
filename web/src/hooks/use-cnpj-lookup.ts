import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SearchDocument } from "@/services/api.service";
import { ApiError, type CompanyResponse } from "@/types/company.types";
import type { LeadFormData } from "@/schemas/form.schema";
import { ERROR_MESSAGES } from "@/constants/errors";
import { ERROR_CODES, type ErrorCode } from "@/constants/error-codes";

export function useCnpjLookup() {
  const mutation = useMutation<CompanyResponse, ApiError, LeadFormData>({
    mutationFn: (formData) => SearchDocument.byCnpj(formData.cnpj),
    onError: (error) => {
      const code: ErrorCode =
        error instanceof ApiError
          ? (error.code as ErrorCode)
          : ERROR_CODES.UNKNOWN;
      const info = ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN;
      toast.error(info.title, { description: info.message });
    },
  });

  return mutation;
}
