import React, { useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import {
  Background,
  CenterLayout,
  AccountForm,
  GlobalStyle,
  FormFieldEmail,
  FormFieldPassword,
  Logo,
  FormFieldButton,
  OauthButton,
  ErrorText,
  FormBottomLinks,
} from "./Login.styles";

export const Login = () => {
  const { emailValidate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorBool, setErrorBool] = useState(false);
  async function loginHandler(e, email, password) {
    e.preventDefault();
    const v = await emailValidate(email);
    if (!v) {
      setErrorBool(true);
    } else {
      console.log("sahi");
    }
  }

  return (
    <Background>
      <GlobalStyle />
      <Logo>Trello</Logo>
      <CenterLayout>
        <AccountForm>
          <h1>Log in to Trello</h1>
          <form onSubmit={(e) => loginHandler(e, email, password)}>
            <div>
              <FormFieldEmail
                type="text"
                required
                value={email}
                id=""
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <ErrorText show={errorBool}>Enter a valid email !</ErrorText>
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
            <ErrorText>" "</ErrorText>

            <FormFieldButton type="submit" value="Log in" />
          </form>

          <div>
            <div className="login-method-seperator text-center">OR</div>
            <OauthButton>
              {" "}
              <span id="google-icon"></span> Continue with Google
            </OauthButton>
          </div>
          <FormBottomLinks>
            <div>
              <Link to="forgot-password"> Can't log in?</Link>
              <Link to="signup" className="bottom-link-two">
                {" "}
                Signup for an account
              </Link>
            </div>
          </FormBottomLinks>
        </AccountForm>
      </CenterLayout>
    </Background>
  );
};
