import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import logo from "../assets/logo2.png";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <>
      <nav className=" md:p-0 flex z-10 h-14 justify-between items-center rounded-full">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="hidden md:flex text-gray-500 h-8 items-center rounded-md ml-11 hover:shadow-md cursor-pointer bg-gray-100 px-1"
        >
          <i className="fa fa-trello mr-1"></i>
          Boards
        </div>
        <div className="pl-4 md:pl-0">
          <img className="h-7 my-2 md:my-0 md:h-8 " src={logo} />
        </div>
        <div className="space-x-10 mr-10 font-medium">
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
