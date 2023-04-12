import logo from "./paw.jpeg";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const { user } = result;
      console.log(user);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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

        <div className="form-container">
          <form onSubmit={handleGoogleSignIn}>
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
            <div className="submit-form">
              <button type="submit">
                <Link to="/homepage">Log in</Link>
              </button>
              <span className="login-caption">
                not a member? <Link to="/signup">Sign Up</Link>
              </span>
            </div>
          </form>
          {/* <button onClick={handleGoogleSignIn}>Sign in with Google</button> */}
        </div>
      </div>

      <script src="https://apis.google.com/js/platform.js" async defer></script>
    </div>
  );
};

export default Login;
