import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const Select = ({
  options,
  id,
  noValueMessage,
  register,
  ...props
}: {
  options: { value: string | number; label: string }[];
  noValueMessage: string;
  register: UseFormRegisterReturn;
} & React.ComponentProps<"select">) => {
  return (
    <select id={id} {...register} {...props}>
      <option value="">{noValueMessage}</option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
