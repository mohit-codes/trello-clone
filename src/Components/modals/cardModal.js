import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { backendUrl, blurHandler } from "../../util/index";
import axios from "axios";

export const CardModal = ({ list, card, setCardState, setShowCardModal }) => {
  useEffect(blurHandler(setShowCardModal));
  const [newDescription, setNewDescription] = useState(card.description ?? "");
  const [newTitle, setNewTitle] = useState(card.title);
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`${backendUrl}/cards/${card._id}`, {
      title: newTitle,
      description: newDescription,
    });
    setCardState({ ...card, title: newTitle, description: newDescription });
    setShowDescriptionEdit(false);
    // setShowTitleEdit(false);
    setLoading(false);
  };

  return (
    <div className="px-5 py-3 w-500 h-500 center-modal fixed z-20 rounded-md cursor-default bg-white text-black">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-xl">
            <i className="far fa-sticky-note mr-1" />
            <input
              type="text"
              className="px-1 border-none outline-none w-40 font-medium focus:font-thin bg-transparent focus:bg-white focus:text-black "
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
              onBlur={(event) => editHandler(event)}
            />
          </p>
          <p className="text-md ml-7">
            <span className="text-gray-400">in list </span>
            <span>{list.title}</span>
          </p>
        </div>
        <span>
          <i
            className="fas fa-times cursor-pointer text-xl text-gray-500"
            onClick={() => setShowCardModal(false)}
          />
        </span>
      </div>
      <div className="flex mt-5 w-52">
        <div>
          <i className="far z-20 fa-file-alt text-gray-400 text-lg" />
        </div>
        <form className="ml-3" onSubmit={(e) => editHandler(e)}>
          <p className="text-gray-400">
            <span className="">Description</span>
            <span>
              <i
                className="fas fa-edit hover:text-black cursor-pointer ml-5"
                onClick={() => setShowDescriptionEdit(true)}
              />
            </span>
          </p>
          {showDescriptionEdit ? (
            <>
              <textarea
                className="p-1 resize-none border-2 mt-2"
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
              />
              <button
                type="submit"
                disabled={newDescription.trim() === card.description}
                className={`py-1 px-2 rounded-md ${
                  newDescription !== card.description
                    ? "bg-blue-400 cursor-pointer hover:shadow-md text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>{" "}
              <span>
                <i
                  className="fas fa-times text-xl cursor-pointer ml-2 text-gray-500"
                  onClick={() => setShowDescriptionEdit(false)}
                />
              </span>
            </>
          ) : (
            <div className="text-md mt-1">{newDescription}</div>
          )}
        </form>
      </div>
    </div>
  );
};

CardModal.propTypes = {
  card: PropTypes.object,
  setShowCardModal: PropTypes.func,
  list: PropTypes.object,
  setCardState: PropTypes.func,
};
