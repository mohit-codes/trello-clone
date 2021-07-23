import axios from "axios";

export const AuthApiLogin = async (email, password) => {
  const response = axios.post("", {
    email,
    password,
  });
  return response;
};

export const AuthApiSignup = async (email, password) => {
  const response = axios.post("", {
    email,
    password,
  });
  return response;
};
