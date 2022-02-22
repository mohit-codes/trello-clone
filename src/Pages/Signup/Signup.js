/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import LeftImage from "../../assets/undraw_a.svg";
import RightImage from "../../assets/undraw_b.svg";
import {
  CenterLayout,
  GlobalStyle,
  FormField,
  FormFieldPassword,
  Logo,
  FormFieldButton,
  ErrorText,
} from "../Login/Login.styles";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export const Signup = () => {
  const { emailValidate, signupUserWithCredentials } = useAuth();
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("Signup");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [serverError, setServerError] = useState("");

  const isPasswordMatched =
    confirmPassword !== "" && confirmPassword === password;

  const checkInputs =
    !email.trim().length && !username.trim().length && isPasswordMatched;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  const navigate = useNavigate();
  useDocumentTitle("Create an account | Trello");
  async function signupHandler(e, username, email, password) {
    setSignupError("");
    setServerError("");
    setSignupStatus("loading");
    e.preventDefault();
    if (checkInputs) {
      if (emailValidate(email)) {
        if (isPasswordValid) {
          const { message, success } = await signupUserWithCredentials(
            username,
            email,
            password
          );
          if (success) {
            setSignupStatus("success");
            navigate("/", { replace: true });
          } else {
            setServerError(message);
            setSignupStatus("Failed");
          }
        }
        setSignupError("PASSWORD_ERROR");
        setSignupStatus("stop");
        return;
      }
      setSignupError("EMAIL_ERROR");
      setSignupStatus("stop");
      return;
    }
    setSignupError("FIELDS_EMPTY");
    setSignupStatus("stop");
  }

  const showerror = () => {
    if (confirmPassword !== password) {
      return "Both passwords must be same";
    }
    switch (signupError) {
      case "PASSWORD_ERROR":
        return "Password must be 8 characters long, have one upper and lower case character and one number.";

      case "EMAIL_ERROR":
        return "Invalid Email";

      case "SIGNUP_ERROR":
        return "Error signing up! Try again.";

      case "FIELDS_EMPTY":
        return "All fields are required. Fill all fields and try again!";

      default:
        return "";
    }
  };

  return (
    <div className="min-w-full min-h-screen ">
      <div className="fixed h-full w-full z-minus1">
        <div className="absolute bottom-0 w-0 sm:w-1/3">
          <img className="" src={LeftImage} />
        </div>
        <div className="absolute bottom-0 right-0 w-0 sm:w-1/3">
          <img className="" src={RightImage} />
        </div>
      </div>
      <GlobalStyle />
      <Logo>Trello</Logo>
      <CenterLayout className="">
        <div>
          <h1 className="text-center ">Sign up for Trello</h1>
          <ErrorText
            show={signupError !== "" || serverError !== "" ? true : false}
          >
            {serverError !== "" ? serverError : showerror()}
          </ErrorText>
          <form
            className="space-y-4"
            onSubmit={(e) => signupHandler(e, username, email, password)}
          >
            <div>
              <FormField
                type="text"
                required
                value={username}
                placeholder="Enter username"
                onChange={(e) => {
                  setSignupError(false);
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <FormField
                type="text"
                required
                value={email}
                placeholder="Enter Email"
                onChange={(e) => {
                  setSignupError(false);
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="password-container">
              <FormFieldPassword
                type={showPassword ? "text" : "password"}
                required
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                {showPassword ? (
                  <i
                    className="fa fa-eye-slash"
                    onClick={() => setShowPassword(false)}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye"
                    onClick={() => setShowPassword(true)}
                  ></i>
                )}
              </div>
            </div>
            <div>
              <FormField
                type="password"
                required
                value={confirmPassword}
                placeholder="Enter the same password"
                onChange={(e) => {
                  setSignupError(false);
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <FormFieldButton
              type="submit"
              value={signupStatus === "loading" ? "Signing Up..." : "Signup"}
            />
          </form>
          <div>
            <div className="method-separator text-center">OR</div>
          </div>
          <div className="text-center">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </CenterLayout>
    </div>
  );
};
