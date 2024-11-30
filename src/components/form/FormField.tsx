import { useId } from "react";
import clsx from "clsx";
import "./formElementsStyles.scss";

interface IProps {
  label: string;
  error?: { message?: string };
  children: (id: string) => React.ReactNode;
}

const FormField = ({ label, children, error }: IProps) => {
  const id = useId();
  return (
    <div className={clsx("field", error && "error")}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      {children(id)}
      {error?.message && <div className="error-text">{error.message}</div>}
    </div>
  );
};

export default FormField;
