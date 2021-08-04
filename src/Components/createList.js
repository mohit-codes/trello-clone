import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { backendUrl } from "../util/constant";
import axios from "axios";

export const CreateList = ({ setshowCreateList, boardId, addList }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTitle("");
    const { data: data } = await axios.post(`${backendUrl}/lists/create`, {
      title: title,
      boardId: boardId,
    });
    addList(data.list);
    setshowCreateList(false);
    setLoading("false");
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
            <button
              type="submit"
              disabled={title.trim() === ""}
              className={`px-3 py-1 rounded-md ${
                title.trim() !== ""
                  ? "bg-blue-500 cursor-pointer"
                  : "bg-gray-200 text-black cursor-not-allowed"
              }`}
            >
              {loading ? "Adding..." : "Add"}
            </button>

            <i
              title="close"
              className="fa fa-times ml-2 text-2xl cursor-pointer"
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
