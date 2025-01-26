import { useForm, SubmitHandler } from "react-hook-form";
import "../form/form.scss";
import "./styles.scss";
import InputField from "../form/InputField";
import { validation } from "../form/validation";
import { useUser } from "../../providers/auth";
import { updateProfile } from "../../api";

type Inputs = {
  name: string;
  phone: string;
  email: string;
};

const ProfileCard = () => {
  const { user, setProfile, token } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (token && user) {
      try {
        const updatedData = {
          ...user,
          ...data,
        };
        await updateProfile({
          token,
          email: data.email,
          data: updatedData,
        });
        setProfile(updatedData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { required } = validation;

  return (
    <div className="profile-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Profile</h1>
        <InputField
          register={register("name", { required })}
          label="Name"
          placeholder="Enter your name"
          error={errors.name}
        />
        <InputField
          register={register("phone", { required })}
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          error={errors.phone}
        />
        <InputField
          register={register("email", { required })}
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email}
        />
        <button className="btn submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileCard;
