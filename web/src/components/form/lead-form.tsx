import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type LeadFormData } from "@/schemas/form.schema";
import { Card } from "@/components/ui/card";
import { TextField } from "./fields/text-field";
import { CnpjField } from "./fields/cnpj-field";
import { PhoneField } from "./fields/phone-field";
import { Loader2, Target } from "lucide-react";
import { Button } from "../ui/button";
import { DEFAULT_VALUES, LETALK_DEMO } from "@/constants/default-form-values";

type Props = {
  onSubmit: (data: LeadFormData) => void;
  isPending?: boolean;
};

export function LeadForm({ onSubmit, isPending }: Props) {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { register, handleSubmit, formState, reset } = form;

  const fillDemo = () => {
    reset({ ...LETALK_DEMO });
    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...form}>
      <Card
        aria-busy={isPending}
        className={`p-6 sm:p-8 shadow-sm transition ${isPending ? "opacity-60 pointer-events-none" : ""}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="grid gap-3 grid-cols-1">
            <TextField
              label="Nome"
              placeholder="João da Silva"
              {...register("name")}
              error={formState.errors.name?.message}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="E-mail"
                type="email"
                placeholder="joao@empresa.com"
                {...register("email")}
                error={formState.errors.email?.message}
              />
              <TextField
                label="Cargo"
                placeholder="Diretor Comercial"
                {...register("role")}
                error={formState.errors.role?.message}
              />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <PhoneField name="phone" label="Telefone" />
            <CnpjField name="cnpj" label="CNPJ da empresa" required />
          </div>

          <button
            type="submit"
            disabled={isPending || formState.isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-base font-medium text-white shadow-md transition-all hover:bg-brand-primary-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 disabled:opacity-60 cursor-pointer"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Consultando Receita..." : "Qualificar lead"}
          </button>
        </form>

        <div className="mt-3 flex flex-col items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
          <Button
            type="button"
            variant="ghost"
            onClick={fillDemo}
            className="text-brand-primary transition hover:text-brand-primary-dark cursor-pointer"
          >
            <Target className="h-4 w-4" />
            Demonstração: qualificar a Letalk
          </Button>
        </div>
      </Card>
    </FormProvider>
  );
}
