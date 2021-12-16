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
} from "./Login.styles";
import useDocumentTitle from "../../hooks/useDocumentTitle";
export const Login = () => {
  const { loginUserWithCredentials } = useAuth();
  const [loginStatus, setLoginStatus] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  useDocumentTitle("Log in into Trello");

  async function loginHandler(e, username, password) {
    e.preventDefault();
    setErrorMsg("");
    setLoginStatus("loading");
    const { message, success } = await loginUserWithCredentials(
      username,
      password
    );
    if (success) {
      setLoginStatus("success");
      navigate("/", { replace: true });
    } else {
      setErrorMsg(message);
      setLoginStatus("Failed");
    }
  }

  return (
    <div className="min-w-full min-h-screen ">
      <div className="fixed h-full w-full z-minus1">
        <div className="absolute bottom-0 w-0 sm:w-1/3">
          <img src={LeftImage} />
        </div>
        <div className="absolute bottom-0 right-0 w-0 sm:w-1/3">
          <img src={RightImage} />
        </div>
      </div>
      <GlobalStyle />
      <Logo>Trello</Logo>
      <CenterLayout className="">
        <div>
          <h1 className="text-center ">Log in to Trello</h1>
          <ErrorText show={errorMsg !== "" ? true : false}>
            {errorMsg}
          </ErrorText>
          <form
            className="space-y-4"
            onSubmit={(e) => loginHandler(e, username, password)}
          >
            <div>
              <FormField
                type="text"
                required
                value={username}
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
            <div className="text-center pt-3">
              <p
                className="hover:underline cursor-pointer"
                onClick={() => {
                  setUsername("test");
                  setPassword("Test@123");
                }}
              >
                Use test credentials
              </p>
            </div>
          </div>
          <div>
            <div className="text-center py-2">OR</div>
          </div>
          <div className="text-center">
            <Link to="/signup">Signup for an account</Link>
          </div>
        </div>
      </CenterLayout>
      <div className="flex justify-center mt-2 text-gray-400 ">
        <span> Made with</span>
        <i className="fa fa-heart ml-1 text-red-600 pt-1 mr-1" />
        <span>by </span>
        <span className="hover:text-gray-500 cursor-pointer ml-1">
          <a
            href="https://linktr.ee/mohit.codes"
            className="no-underline text-gray-500"
          >
            Mohit
          </a>
        </span>
      </div>
    </div>
  );
};
