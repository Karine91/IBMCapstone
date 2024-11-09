import "./Sing_Up.scss";

const SignUpForm = () => {
  return (
    <div className="sign-up-form-wrapper">
      <form className="form">
        <div className="header">
          <div>Sign Up</div>
          <div className="header-secondary">
            Already a member?{" "}
            <a className="link" href="/login">
              Login
            </a>
          </div>
        </div>
        <div>
          <div className="field">
            <label className="label" htmlFor="name">
              Role
            </label>
            <input
              type="text"
              className="field-input"
              placeholder="Enter your role"
              name="role"
              id="role"
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="field-input"
              placeholder="Enter your name"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              className="field-input"
              placeholder="Enter your phone number"
              name="phone"
              id="phone"
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="field-input"
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="field-input"
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              required
            />
          </div>
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

export default SignUpForm;
