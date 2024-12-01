import { useForm, SubmitHandler } from "react-hook-form";
import "../form/form.scss";
import "./styles.scss";
import InputField from "../form/InputField";
import { validation } from "../form/validation";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { useState } from "react";
import { useUser } from "../../providers/auth";

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

  const navigate = useNavigate();

  const [showErr, setShowErr] = useState<string[]>([]);
  const { login } = useUser();

  const { required } = validation;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await response.json();
      if (json.authtoken) {
        // Store user data in session storage
        login({
          token: json.authtoken,
          email,
        });

        // Redirect user to home page
        navigate("/");
      }

      if (json.error) {
        if (Array.isArray(json.error)) {
          setShowErr(json.error.map((item: any) => item.msg));
        } else {
          setShowErr([json.error.msg || json.error.toString()]);
        }
      }
    } catch (error) {
      console.log(error);
      setShowErr(["Something went wrong..."]);
    }
  };
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

        {showErr.length ? (
          <div className="errors">
            {showErr.map((err, ind) => (
              <div key={ind} className="error-text">
                {err}
              </div>
            ))}
          </div>
        ) : null}

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
