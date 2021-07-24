import React, { useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import Imga from "../../assets/undraw_a.svg";
import Imgb from "../../assets/undraw_b.svg";
import {
  CenterLayout,
  AccountForm,
  GlobalStyle,
  FormFieldEmail,
  FormFieldPassword,
  Logo,
  FormFieldButton,
  ErrorText,
} from "./Login.styles";

export const Login = () => {
  const { loginUserWithCredentials } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorBool, setErrorBool] = useState(false);
  async function loginHandler(e, username, password) {
    e.preventDefault();
    const v = loginUserWithCredentials(username, password);
    if (!v) {
      setErrorBool(true);
    } else {
      console.log("sahi");
    }
  }

  return (
    <div className="min-w-full min-h-screen ">
      <div className="fixed h-full w-full z-minus1">
        <div className="absolute bottom-0 w-0 sm:w-1/3">
          <img className="" src={Imga} />
        </div>
        <div className="absolute bottom-0 right-0 w-0 sm:w-1/3">
          <img className="" src={Imgb} />
        </div>
      </div>
      <GlobalStyle />
      <Logo>Trello</Logo>
      <CenterLayout className="">
        <AccountForm>
          <h1 className="text-center ">Log in to Trello</h1>
          <ErrorText show={errorBool}>Enter a valid email !</ErrorText>
          <form
            className="space-y-4"
            onSubmit={(e) => loginHandler(e, username, password)}
          >
            <div>
              <FormFieldEmail
                type="text"
                required
                value={username}
                id=""
                placeholder="Enter username"
                onChange={(e) => {
                  setErrorBool(false);
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="password-container">
              <FormFieldPassword
                type={showPassword ? "text" : "password"}
                required
                value={password}
                id=""
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
            <FormFieldButton type="submit" value="Log in" />
          </form>
          <div>
            <div className="login-method-separator text-center">OR</div>
          </div>
          <div className="text-center">
            <Link to="signup">Signup for an account</Link>
          </div>
        </AccountForm>
      </CenterLayout>
    </div>
  );
};
