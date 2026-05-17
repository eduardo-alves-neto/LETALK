import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SearchDocument } from "@/services/api.service";
import { ApiError, type CompanyResponse } from "@/types/company.types";
import type { LeadFormData } from "@/schemas/form.schema";
import { ERROR_MESSAGES } from "@/constants/errors";
import { ERROR_CODES, type ErrorCode } from "@/constants/error-codes";

function resolveErrorCode(error: unknown): ErrorCode {
  if (error instanceof ApiError && error.code in ERROR_MESSAGES) {
    return error.code;
  }
  return ERROR_CODES.UNKNOWN;
}

export function useCnpjLookup() {
  const mutation = useMutation<CompanyResponse, ApiError, LeadFormData>({
    mutationFn: (formData) =>
      SearchDocument.byCnpj(formData.cnpj.replace(/\D/g, "")),
    onError: (error) => {
      const info = ERROR_MESSAGES[resolveErrorCode(error)];
      toast.error(info.title, { description: info.message });
    },
  });

  return mutation;
}
