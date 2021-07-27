import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import logo from "../assets/logo2.png";

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="flex z-10 h-16 justify-between items-center px-10">
        <div className="flex h-10 items-center">
          <i className="fa fa-search text-gray-400"></i>
          <input
            className=" border-none outline-none px-2 py-1 "
            type="text"
            placeholder="Search Boards"
          />
        </div>
        <div className="cursor-pointer" onClick={useNavigate("/")}>
          <img className="h-10 " src={logo} />
        </div>
        <div className="space-x-10">
          <span> Hello, {user?.username} </span>
          <span onClick={() => logout()}>
            <i className="fa fa-sign-out text-red-600 cursor-pointer text-xl"></i>
          </span>
        </div>
      </nav>
    </>
  );
};
