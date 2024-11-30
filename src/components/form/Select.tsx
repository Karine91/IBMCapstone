import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";

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
    <div className="select-wrapper">
      <select className="select" id={id} {...register} {...props}>
        <option className="select-item" value="">
          {noValueMessage}
        </option>
        {options.map((item) => (
          <option className="select-item" key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <IoIosArrowDown className="arrow-down" />
    </div>
  );
};

export default Select;
