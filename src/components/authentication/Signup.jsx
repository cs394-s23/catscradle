import logo from "./paw.jpeg";
import "./Signup.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
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

  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    navigate("/");
    window.location.reload();
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
        <h1>Sign Up</h1>

        <div className="form-container">
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
              <label>Repeat Password:</label>
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="submit-form">
              <button type="submit">Sign Up</button>
              <span className="login-caption">
                already a member? <Link to="/login">log in</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
