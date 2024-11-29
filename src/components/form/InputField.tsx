import "./style.scss";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ComponentProps } from "react";

import FormField from "./FormField";

interface IProps
  extends Omit<ComponentProps<"input">, keyof UseFormRegisterReturn> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({ label, register, error, ...props }: IProps) => {
  return (
    <FormField label={label} error={error}>
      {(id) => (
        <input
          aria-invalid={error ? "true" : "false"}
          className="field-input"
          id={id}
          {...register}
          {...props}
        />
      )}
    </FormField>
  );
};

export default InputField;
