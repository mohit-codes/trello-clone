import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosDelete, backendUrl, blurHandler } from "../../util/index";
import axios from "axios";
import { AddComment } from "../addComment";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { Comment } from "../comment";

export const CardModal = ({
  list,
  card,
  setCardState,
  setShowCardModal,
  removeCard,
}) => {
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
    setLoading(false);
  };

  const {
    data: comments,
    addItem: addCommentItem,
    removeItem: removeComment,
  } = useAxiosGet("cards/comments", card._id);

  const cardDeleteHandler = async (e) => {
    e.preventDefault();
    await axiosDelete("cards", card._id);
    setShowCardModal(false);
    removeCard(card._id);
  };

  const commentDeleteHandler = async (e, id) => {
    e.preventDefault();
    await axiosDelete("comments", id);
    removeComment(id);
  };

  return (
    <div className="px-5 py-5 w-600 h-500 center-modal overflow-y-scroll  fixed z-20 rounded-md cursor-default bg-white text-black">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-xl">
            <i className="far fa-sticky-note" />
            <input
              type="text"
              className="px-1 ml-2 border:none max-w-min font-medium focus:font-thin bg-transparent focus:bg-white focus:text-black "
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
              onBlur={(event) => editHandler(event)}
            />
          </p>
          <p className="text-md ml-8">
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
          <i className="far  fa-file-alt text-gray-400 text-lg" />
        </div>
        <form className="ml-4" onSubmit={(e) => editHandler(e)}>
          <p className="text-gray-400">
            <span className="">Description</span>
            <span>
              <i
                className="fas fa-edit text-gray-300 hover:text-black cursor-pointer ml-5"
                onClick={() => setShowDescriptionEdit(true)}
              />
            </span>
          </p>
          {showDescriptionEdit ? (
            <>
              <textarea
                className="p-1 text-sm resize-none border-2 mt-2 w-80 h-20"
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
                  onClick={() => {
                    setShowDescriptionEdit(false);
                    setNewDescription(card.description);
                  }}
                />
              </span>
            </>
          ) : (
            <div className="text-sm mt-1">{newDescription}</div>
          )}
        </form>
      </div>
      <AddComment addCommentItem={addCommentItem} card={card} />
      <div className="mt-3">
        <i className="fas fa-stream text-gray-400" />
        <span className="text-gray-400 ml-3">Comments</span>
        <div className="ml-6 space-y-2 w-80">
          {comments?.map((comment, index) => (
            <Comment
              comment={comment}
              commentDeleteHandler={commentDeleteHandler}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="fixed right-16 top-14">
        <p>Actions</p>
        <button
          onClick={(e) => cardDeleteHandler(e)}
          className="text-center mt-1 text-red-600  text-xs  rounded-md  ml-auto hover:underline"
        >
          <i className="fas fa-trash"></i> Delete Card
        </button>
      </div>
    </div>
  );
};

CardModal.propTypes = {
  card: PropTypes.object,
  setShowCardModal: PropTypes.func,
  list: PropTypes.object,
  setCardState: PropTypes.func,
  removeCard: PropTypes.func,
};
