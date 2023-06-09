import logo from "./paw.jpeg";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

const Login = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        var userName = data.user.displayName;
        var userEmail = data.user.email;
        var imgUrl = data.user.photoURL;

        // See if email contains northwestern domain
        if (!userEmail.includes("u.northwestern.edu")) {
          // alert("Please use accounts with 'u.northwestern.edu' domain.");
          setIsEmailValid(false);

          return;
        }

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
          <form>
            <div className="google-sign-in">
              <GoogleButton label="Sign in" onClick={signInWithGoogle} />
              {!isEmailValid ? (
                <p style={{ color: "red" }}>
                  Please use accounts with 'u.northwestern.edu' domain"
                </p>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
