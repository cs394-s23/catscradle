import logo from "./paw.jpeg";
import "./Signup.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };

  return (
    <div className="root">
      <div className="sign-up">
        {/* logo and app name */}
        <div className="logo">
          <p>
            <span style={{ fontSize: "40px" }}>CatsCradle</span>
            <span style={{ marginLeft: "5px" }}>
              <img src={logo} />
            </span>
          </p>
        </div>

        {/* form */}
        <h1>Log In</h1>

        <div class="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={state.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label></label>
              <button type="submit">Log In</button>
              <span className="login-caption">
                not a member? <Link to="/signup">Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
