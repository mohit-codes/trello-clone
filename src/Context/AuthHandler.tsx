import axios from "axios";

export const AuthApiLogin = async (email: string, password: string) => {
    const response = axios.post("",
        {
            email,
            password,
        });
    return response;
};

export const AuthApiSignup = async (email: string, password: string) => {
    const response = axios.post("",
        {
            email,
            password,
        });
    return response;
};