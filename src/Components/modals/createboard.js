import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";
import { backendUrl } from "../../util/constant";
function CreateBoard({ setShowModal, addBoard }) {
  const [title, seTitle] = useState("");
  const { user } = useAuth();
  const submitHandler = async (e) => {
    e.preventDefault();
    seTitle("");
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
          <span> Board Title</span>
          <i
            title="close"
            className="fa fa-times font-thin cursor-pointer"
            onClick={() => setShowModal(false)}
          ></i>
        </div>
        <input
          className="focus:border-blue-600 border-2  border-gray-400 outline-none w-full"
          value={title}
          onChange={(e) => seTitle(e.target.value)}
        />
        {title.trim() !== "" ? (
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 rounded-md text-white cursor-pointer"
          >
            Create
          </button>
        ) : (
          <button
            type="submit"
            disabled={true}
            className="px-3 py-1 bg-gray-300  rounded-md text-black cursor-not-allowed"
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
}
CreateBoard.propTypes = {
  setShowModal: PropTypes.func,
  addBoard: PropTypes.func,
};
export default CreateBoard;
