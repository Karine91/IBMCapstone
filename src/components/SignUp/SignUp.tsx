import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../form/form.scss";
import InputField from "../form/InputField";
import { validation } from "../form/validation";
import { Link } from "react-router-dom";
import { useUser } from "../../providers/auth";
import { signup, fetchProfile } from "../../api";

type Inputs = {
  role: string;
  name: string;
  phone: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [showErr, setShowErr] = useState<string[]>([]);
  const { saveToken, setProfile } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const { required } = validation;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const json = await signup(data);
      if (json.authtoken) {
        // Store user data in session storage
        saveToken(json.authtoken);
        const userData = await fetchProfile(data.email, json.authtoken);
        setProfile(userData);

        // Redirect user to home page
        navigate("/");
      }

      if (json.error) {
        if (Array.isArray(json.error)) {
          setShowErr(json.error.map((item: any) => item.msg));
        } else {
          setShowErr([json.error.msg || json.error]);
        }
      }
    } catch (error) {
      console.log(error);
      setShowErr(["Something went wrong..."]);
    }
  };
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
        {showErr.length ? (
          <div className="errors">
            {showErr.map((err, ind) => (
              <div key={ind} className="error-text">
                {err}
              </div>
            ))}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default SignUp;
