import { useForm, SubmitHandler } from "react-hook-form";
import "../form/form.scss";
import InputField from "../form/InputField";
import { validation } from "../form/validation";
import { Link } from "react-router-dom";

type Inputs = {
  role: string;
  name: string;
  phone: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const { required } = validation;

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="header">
          <div>Sign Up</div>
          <div className="header-secondary">
            Already a member?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div>
          <InputField
            register={register("role", { required })}
            label="Role"
            placeholder="Enter your role"
            error={errors.role}
          />
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

          <InputField
            register={register("password", { required })}
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password}
          />
        </div>

        <div className="btn-group">
          <button className="btn submit" type="submit">
            Sing Up
          </button>
          <button className="btn reset" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
