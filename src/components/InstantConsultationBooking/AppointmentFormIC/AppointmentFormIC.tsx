import { useForm } from "react-hook-form";
import InputField from "../../form/InputField";
import { validation } from "../../form/validation";
import "./style.scss";
import Select from "../../form/Select";
import FormField from "../../form/FormField";
import { SelectOptions } from "../types";

export type Inputs = {
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
};

interface IProps {
  onSubmit: (data: Inputs) => void;
  timeSlots: SelectOptions[];
}

const AppointmentFormIC = ({ onSubmit, timeSlots }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  const { required } = validation;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
      <InputField
        register={register("name", { required })}
        label="Name"
        type="text"
        placeholder="Enter your name"
        error={errors.name}
      />
      <InputField
        register={register("phoneNumber", { required })}
        label="Phone"
        type="tel"
        placeholder="Enter your phone"
        error={errors.phoneNumber}
      />
      <InputField
        register={register("date", { required })}
        label="Date of Appointment"
        type="date"
        error={errors.date}
      />

      <FormField label="Book Time Slot:" error={errors.time}>
        {(id) => (
          <Select
            id={id}
            register={register("time", { required })}
            options={timeSlots}
            noValueMessage="Select a time slot"
          />
        )}
      </FormField>

      <button className="book-appointment" type="submit">
        Book Now
      </button>
    </form>
  );
};

export default AppointmentFormIC;
