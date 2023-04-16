import logo from "./paw.jpeg";
import "./Signup.css";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import GoogleButton from "react-google-button";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const [icon, setIcon] = useState(faEye);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    let icon2 = icon == faEye ? faEyeSlash : faEye;
    setIcon(icon2);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
    window.location.reload();
  };

  // Handle google log in function

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        var userName = data.user.displayName;
        var userEmail = data.user.email;
        var imgUrl = data.user.photoURL;

        localStorage.setItem("name", userName);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("photo", imgUrl);

        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="email"
                required="!"
                onChange={handleInputChange}
              />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                required="!"
                onChange={handleInputChange}
              />
              <FontAwesomeIcon icon={icon} onClick={togglePassword} />
              <label>Password</label>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>

            <div className="google-sign-in">
              <span style={{ marginLeft: "-30px" }}> or </span>
              <GoogleButton
                type="dark"
                label="Sign in"
                onClick={signInWithGoogle}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
