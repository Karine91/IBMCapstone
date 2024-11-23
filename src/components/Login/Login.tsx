import { useForm, SubmitHandler } from "react-hook-form";
import "../form/form.scss";
import "./styles.scss";
import InputField from "../form/InputField";
import { validation } from "../form/validation";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  const { required } = validation;
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="form-wrapper login">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="header">
          <div>Login</div>
          <div className="header-secondary">
            Are you a new member?{" "}
            <Link className="link" to="/signup">
              Sign Up Here
            </Link>
          </div>
        </div>
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
        <div className="btn-group">
          <button className="btn submit" type="submit">
            Submit
          </button>
          <button className="btn reset" type="reset">
            Reset
          </button>
        </div>

        <div className="forgot-pass">
          <Link className="forgot-pass-link" to="#">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
