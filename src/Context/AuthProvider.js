import React, { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("authToken"))
  );
  const navigate = useNavigate();
  const loginUserWithCredentials = async (username, password) => {
    try {
      const {
        data: { user, success, message, token },
      } = await axios.post("http://localhost:8080/users/login", {
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
      } = await axios.post("http://localhost:8080/users/signup", {
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
