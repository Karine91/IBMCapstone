import { useForm } from "react-hook-form";
import InputField from "../../components/form/InputField";
import { validation } from "../../components/form/validation";
import "./style.scss";

type Inputs = {
  name: string;
  phoneNumber: string;
};

interface IProps {
  onSubmit: (data: Inputs) => void;
}

const AppointmentFormIC = ({ onSubmit }: IProps) => {
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
      <button className="book-appointment" type="submit">
        Book Now
      </button>
    </form>
  );
};

export default AppointmentFormIC;
