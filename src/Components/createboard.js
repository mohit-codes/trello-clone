import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";
import { backendUrl } from "../util/constant";
export function CreateBoard({ setShowModal, addBoard }) {
  const [title, setTitle] = useState("");
  const { user } = useAuth();
  const submitHandler = async (e) => {
    e.preventDefault();
    setTitle("");
    const { data: data } = await axios.post(`${backendUrl}/boards/create`, {
      title: title,
      userId: user._id,
      isPersonal: true,
    });

    addBoard(data.board);
    setShowModal(false);
  };
  return (
    <div className="w-60 h-32 mt-6 p-2 border-2 bg-gray-100 border-black ">
      <form className="space-y-2" onSubmit={(e) => submitHandler(e)}>
        <div className="flex justify-between">
          <span className="text-black"> Board Title</span>
          <i
            title="close"
            className="fa fa-times font-thin cursor-pointer"
            onClick={() => setShowModal(false)}
          ></i>
        </div>
        <input
          className="focus:border-blue-600 border-2 text-black  border-gray-400 outline-none w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={title.trim() === ""}
          className={`px-3 py-1 rounded-md ${
            title.trim() !== ""
              ? "bg-blue-500  text-white cursor-pointer"
              : " bg-gray-300 text-black cursor-not-allowed"
          }`}
        >
          Create
        </button>
      </form>
    </div>
  );
}
CreateBoard.propTypes = {
  setShowModal: PropTypes.func,
  addBoard: PropTypes.func,
};
