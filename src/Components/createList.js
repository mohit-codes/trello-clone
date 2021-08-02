import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { backendUrl } from "../util/constant";
import axios from "axios";

export const CreateList = ({ setshowCreateList, boardId, addList }) => {
  const [title, setTitle] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setTitle("");
    const { data: data } = await axios.post(`${backendUrl}/lists/create`, {
      title: title,
      boardId: boardId,
    });
    addList(data.list);
    setshowCreateList(false);
  };
  return (
    <>
      <div className="rounded-md h-36 bg-blue-400 border-2 p-3 border-black">
        <form onSubmit={(e) => submitHandler(e)}>
          <div>
            <p>List title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="my-2 outline-none border-2 border-blue-500 px-1 text-black"
            />
          </div>
          <div className="flex items-center mt-3">
            {title.trim() !== "" ? (
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 rounded-md text-white cursor-pointer"
              >
                Add
              </button>
            ) : (
              <button
                type="submit"
                disabled={true}
                className="px-3 py-1 bg-gray-200 rounded-md text-black cursor-not-allowed "
              >
                Add
              </button>
            )}
            <i
              title="close"
              className="fa fa-times ml-2 font-thin text-2xl cursor-pointer"
              onClick={() => setshowCreateList(false)}
            ></i>
          </div>
        </form>
      </div>
    </>
  );
};

CreateList.propTypes = {
  setshowCreateList: PropTypes.func,
  boardId: PropTypes.string,
  addList: PropTypes.func,
};
