import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from "../util/constant";

export const CreateCard = ({ listId, setShowCreateCard, addCard }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setTitle("");
    setLoading(true);
    const { data: data } = await axios.post(`${backendUrl}/cards/create`, {
      title: title,
      listId: listId,
    });
    addCard(data.card);
    setLoading("false");
    setShowCreateCard(false);
  };

  return (
    <div className="bg-gray-700 rounded-md p-3 mt-3">
      <form onSubmit={(e) => submitHandler(e)}>
        <p>Card title</p>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className="my-2 outline-none border-2 border-blue-500 px-1 text-black"
        />
        <button
          type="submit"
          disabled={title.trim() === ""}
          className={`py-1 px-2 ${
            title.trim() !== ""
              ? "bg-blue-400 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
        <i
          className="fa fa-times text-2xl ml-2 cursor-pointer"
          title="close"
          onClick={() => setShowCreateCard(false)}
        ></i>
      </form>
    </div>
  );
};
CreateCard.propTypes = {
  listId: PropTypes.string,
  setShowCreateCard: PropTypes.func,
  addCard: PropTypes.func,
};
