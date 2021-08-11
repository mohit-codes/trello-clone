import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";
import {
  backendUrl,
  axiosDelete,
  blurHandler,
  formatDate,
} from "../../util/index";
import { useNavigate } from "react-router-dom";

export const BoardMenuModal = ({
  board,
  setBoard,
  setShowMenu,
  projectAdmin,
}) => {
  useEffect(blurHandler(setShowMenu), []);

  const navigate = useNavigate();

  const { user } = useAuth();
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);

  const date = formatDate(board.createdAt);

  const isAdmin = projectAdmin === undefined ? true : projectAdmin === user._id;

  const [newTitle, setNewTitle] = useState(board.title);
  const [newDescription, setNewDescription] = useState(board.description);

  const [loading, setLoading] = useState(false);

  const deleteHandler = async (e) => {
    e.preventDefault();
    await axiosDelete("boards", board._id);
    navigate(-1);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`${backendUrl}/boards/${board._id}`, {
      title: newTitle,
      description: newDescription,
    });
    setBoard({ ...board, title: newTitle, description: newDescription });
    setShowDescriptionEdit(false);
    setShowTitleEdit(false);
    setLoading(false);
  };
  return (
    <>
      <div className="fixed z-20 text-black px-3 py-1 bg-white flex flex-col rounded-sm center-modal w-80 lg:min-h-72 lg:max-w-900 lg:w-500 max-h-s500">
        <div className="border-b-2 w-full pb-1 py-1 border-gray-300">
          <span className="text-xl font-semibold">About This Board</span>
          <i
            title="close"
            className="fas fa-times absolute right-3 top-1 text-xl  cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <div className="py-3 px-2">
          <p>
            <i className="fa fa-calendar text-lg mr-3" />
            <span className="font-medium">Created on </span>
            <span>{date}</span>
          </p>
          <div className="py-3 space-y-5">
            <div>
              <div className="flex justify-between w-60 mb-2">
                <span className=" text-lg font-medium">
                  <i className="fas fa-thumbtack mr-2" /> Title
                </span>
                <span
                  onClick={isAdmin ? () => setShowTitleEdit(true) : null}
                  className={isAdmin ? "cursor-pointer" : "cursor-not-allowed"}
                >
                  <i className="fas fa-edit " /> Edit
                </span>
              </div>
              {!showTitleEdit ? (
                <p>{board.title}</p>
              ) : (
                <form onSubmit={(e) => editHandler(e)}>
                  <input
                    type="text"
                    className="border-2 p-1 border-black"
                    value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)}
                  />
                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={newTitle === board.title}
                      className={`py-1 px-2 rounded-md ${
                        newTitle !== board.title
                          ? "bg-blue-400 cursor-pointer hover:shadow-md text-white"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <i
                      title="close"
                      className="fa fa-times ml-3 cursor-pointer"
                      onClick={() => setShowTitleEdit(false)}
                    ></i>
                  </div>
                </form>
              )}
            </div>
            <div>
              <div className="flex justify-between w-60 mb-2 ">
                <span className="text-lg font-medium">
                  <i className="fas fa-file-alt mr-2" /> Description
                </span>
                <span
                  onClick={isAdmin ? () => setShowDescriptionEdit(true) : null}
                  className={isAdmin ? "cursor-pointer" : "cursor-not-allowed"}
                >
                  <i className="fas fa-edit " /> Edit
                </span>
              </div>
              {!showDescriptionEdit ? (
                <p className="w-52 break-words">{board.description}</p>
              ) : (
                <form onSubmit={(e) => editHandler(e)}>
                  <textarea
                    type="text"
                    className="border-2 p-1 resize-none border-black"
                    value={newDescription}
                    onChange={({ target }) => setNewDescription(target.value)}
                  />
                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={newDescription === board.description}
                      className={`py-1 px-2 rounded-md ${
                        newDescription !== board.description
                          ? "bg-blue-400 cursor-pointer hover:shadow-md text-white"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>

                    <i
                      title="close"
                      className="fa fa-times ml-3 cursor-pointer"
                      onClick={() => setShowDescriptionEdit(false)}
                    ></i>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="flex w-full">
            <button
              disabled={!isAdmin}
              onClick={(e) => deleteHandler(e)}
              className={`text-center text-red-600 border-2 border-red-600 rounded-md p-2 ml-auto hover:shadow-md ${
                !isAdmin ? "cursor-not-allowed" : ""
              }`}
            >
              Delete Board <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
BoardMenuModal.propTypes = {
  setShowMenu: PropTypes.func,
  board: PropTypes.object,
  setBoard: PropTypes.func,
  projectAdmin: PropTypes.string,
};
