import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "./text-field";
import { cnpj } from "cpf-cnpj-validator";

type Props = {
  name: string;
  label: string;
  required?: boolean;
};

export function CnpjField({ name, label, required }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          label={label}
          required={required}
          placeholder="00.000.000/0000-00"
          inputMode="numeric"
          maxLength={18}
          value={field.value ?? ""}
          onChange={(e) => field.onChange(cnpj.format(e.target.value))}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
