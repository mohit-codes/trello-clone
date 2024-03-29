import React, { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../util/constant";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("authToken"))
  );
  const navigate = useNavigate();

  if (token) {
    console.log("token set");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(undefined, function (error) {
    console.log("⚡️⚡️ ~ file: AuthProvider.jsx:28 ~ error.response", error);
    console.log("⚡️⚡️ ~ file: AuthProvider.jsx:28 ~ error.response", error);
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.data.message === "Invalid Token"
    ) {
      logout();
    }
    return Promise.reject(error);
  });

  const loginUserWithCredentials = async (username, password) => {
    try {
      const {
        data: { user, success, message, token },
      } = await axios.post(`${backendUrl}/users/login`, {
        username: username.toLowerCase(),
        password,
      });
      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage?.setItem("authUser", JSON.stringify(user));
        localStorage?.setItem("authToken", JSON.stringify(token));
      }
      return { user, message, success };
    } catch (error) {
      console.log(error);
    }
  };

  const signupUserWithCredentials = async (username, email, password) => {
    try {
      const {
        data: { user, success, message, token },
      } = await axios.post(`${backendUrl}/users/signup`, {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
      });
      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage?.setItem("authUser", JSON.stringify(user));
        localStorage?.setItem("authToken", JSON.stringify(token));
      }
      return { user, message, success };
    } catch (error) {
      console.log(error);
    }
  };

  function emailValidate(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    axios.defaults.headers.common["Authorization"] = null;
    localStorage?.removeItem("authUser");
    localStorage?.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        emailValidate,
        loginUserWithCredentials,
        signupUserWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
