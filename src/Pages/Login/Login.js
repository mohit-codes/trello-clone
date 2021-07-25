import React, { useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import LeftImage from "../../assets/undraw_a.svg";
import RightImage from "../../assets/undraw_b.svg";
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
  const [loginStatus, setLoginStatus] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // const { state } = useLocation();
  // const navigate = useNavigate();

  async function loginHandler(e, username, password) {
    e.preventDefault();
    setLoginStatus("loading");
    const { message, success } = await loginUserWithCredentials(
      username,
      password
    );
    if (success) {
      setLoginStatus("success");
      // navigate("/home");
    } else {
      setErrorMsg(message);
      setLoginStatus("Failed");
    }
  }

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
        <AccountForm>
          <h1 className="text-center ">Log in to Trello</h1>
          <ErrorText show={errorMsg !== "" ? true : false}>
            {errorMsg}
          </ErrorText>
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
                  setErrorMsg(false);
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
            <FormFieldButton
              type="submit"
              value={loginStatus === "loading" ? "Logging In..." : "Login"}
            />
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
