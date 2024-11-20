import "./style.scss";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useId, ComponentProps } from "react";
import clsx from "clsx";

interface IProps
  extends Omit<ComponentProps<"input">, keyof UseFormRegisterReturn> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({ label, register, error, ...props }: IProps) => {
  const id = useId();
  return (
    <div className={clsx("field", error && "error")}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        aria-invalid={error ? "true" : "false"}
        className="field-input"
        id={id}
        {...register}
        {...props}
      />
      {error?.message && <div className="error-text">{error.message}</div>}
    </div>
  );
};

export default InputField;
