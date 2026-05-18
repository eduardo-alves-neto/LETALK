import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "./text-field";
import { maskPhone } from "@/lib/utils";

interface PhoneFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

export function PhoneField({ name, label, required }: PhoneFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          label={label}
          required={required}
          placeholder="(11) 91234-5678"
          inputMode="tel"
          maxLength={15}
          value={field.value ?? ""}
          onChange={(e) => field.onChange(maskPhone(e.target.value))}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
