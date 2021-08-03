/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import logo from "../assets/logo2.png";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="pl-4 md:p-0 flex z-10 h-14 justify-between items-center rounded-full">
        <div className="hidden md:flex h-10 items-center ml-10">
          <i className="fa fa-search text-gray-400"></i>
          <input
            className=" border-none outline-none px-2 py-1 "
            type="text"
            placeholder="Search Boards"
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="h-10 " src={logo} />
        </div>
        <div className="space-x-10 mr-10">
          <span> Hello, {user?.username} </span>
          <span
            onClick={() => {
              logout();
            }}
          >
            <i
              title="Logout"
              className="fa fa-sign-out text-red-600 cursor-pointer text-xl"
            ></i>
          </span>
        </div>
        <div className="out-of-focus"></div>
      </nav>
    </>
  );
};
