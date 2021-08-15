import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosDelete, backendUrl, blurHandler } from "../../util/index";
import axios from "axios";
import { AddComment } from "../addComment";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { Comment } from "../comment";
import { useAuth } from "../../Context/AuthProvider";

export const CardModal = ({
  list,
  card,
  setCardState,
  setShowCardModal,
  removeCard,
  projectAdmin,
}) => {
  useEffect(blurHandler(setShowCardModal));
  card = { ...card, description: "" };
  const [newDescription, setNewDescription] = useState(card.description ?? "");
  const [newTitle, setNewTitle] = useState(card.title);
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const isAdmin = projectAdmin === undefined ? true : projectAdmin === user._id;
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
    <div className="px-5 py-5 w-full h-400 md:w-600 md:h-500 center-modal overflow-y-scroll  fixed z-20 rounded-md cursor-default bg-white text-black">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-xl">
            <i className="far fa-sticky-note" />
            <span className="ml-3">{newTitle}</span>
          </p>
          <p className="text-md ml-8">
            <span className="text-gray-400">in list </span>
            <span>{list.title}</span>
          </p>
        </div>
        <span>
          <i
            title="close"
            className="fas fa-times cursor-pointer text-xl text-gray-500"
            onClick={() => setShowCardModal(false)}
          />
        </span>
      </div>

      <div className="flex mt-5 w-52">
        <form onSubmit={(e) => editHandler(e)}>
          <div>
            <p>
              <i className="fa fa-thumbtack fa-outlined text-lg" />
              <span className="ml-4">Title</span>
              <span>
                <i
                  className={`fas fa-edit text-gray-300  cursor-pointer ml-5 ${
                    isAdmin
                      ? "cursor-pointer hover:text-black"
                      : "cursor-not-allowed"
                  }`}
                  onClick={isAdmin ? () => setShowTitleEdit(true) : null}
                />
              </span>
            </p>
            {showTitleEdit && (
              <div className="ml-7">
                <input
                  type="text"
                  className="p-1 w-full border-2 mt-2 font-medium focus:font-thin  focus:text-black "
                  value={newTitle}
                  onChange={({ target }) => setNewTitle(target.value)}
                />
                <button
                  type="submit"
                  disabled={newTitle.trim() === card.title}
                  className={`py-1 mt-2 px-2 rounded-md ${
                    newTitle !== card.title
                      ? "bg-blue-400 cursor-pointer hover:shadow-md text-white"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>{" "}
                <span>
                  <i
                    className="fas fa-times text-xl ml-2 text-gray-500"
                    onClick={() => {
                      setShowTitleEdit(false);
                      setNewTitle(card.title);
                    }}
                  />
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="mt-5">
              <i className="far  fa-file-alt text-lg" />
              <span className="ml-4">Description</span>
              <span>
                <i
                  className={`fas fa-edit text-gray-300  cursor-pointer ml-5 ${
                    isAdmin
                      ? "cursor-pointer hover:text-black"
                      : "cursor-not-allowed"
                  }`}
                  onClick={isAdmin ? () => setShowDescriptionEdit(true) : null}
                />
              </span>
            </p>
            {showDescriptionEdit ? (
              <div className="ml-7">
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
                    className="fas fa-times text-xl ml-2 text-gray-500"
                    onClick={() => {
                      setShowDescriptionEdit(false);
                      setNewDescription(card.description ?? "");
                    }}
                  />
                </span>
              </div>
            ) : (
              <div className="text-sm mt-1 ml-8">
                {newDescription === "" ? "No Description" : newDescription}
              </div>
            )}
          </div>
        </form>
      </div>
      <AddComment addCommentItem={addCommentItem} card={card} />
      <div className="mt-3">
        <i className="fas fa-stream " />
        <span className=" ml-3">Comments</span>
        <div className="ml-7 space-y-2 w-80">
          {comments?.map((comment) => (
            <Comment
              comment={comment}
              commentDeleteHandler={commentDeleteHandler}
              key={comment._id}
            />
          ))}
        </div>
      </div>
      <div className="fixed right-16 top-14">
        <p>Actions</p>
        <button
          disabled={!isAdmin}
          onClick={(e) => cardDeleteHandler(e)}
          className={`text-center mt-1 text-red-600  text-xs  rounded-md  ml-auto hover:underline  ${
            isAdmin ? "cursor-pointer" : "cursor-not-allowed"
          }`}
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
  projectAdmin: PropTypes.string,
};
