import React, { useState } from "react";
import PropTypes from "prop-types";
import { backendUrl, timeSince } from "../util";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";

export const Comment = ({ comment, commentDeleteHandler }) => {
  const { user } = useAuth();

  const [newContent, setNewContent] = useState(comment.content);

  const isAuthor = user.username === comment.author;

  const [toggleEdit, setToggleEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`${backendUrl}/comments/${comment._id}`, {
      content: newContent,
    });
    setLoading(false);
    setToggleEdit(false);
  };

  return (
    <div className="py-1">
      <div className="flex">
        <div className=" text-gray-300 mr-2 bg-yellow-200 w-10 h-10"></div>
        <div>
          <p className="text-black font-medium">{comment.author}</p>
          <p className="text-xs text-gray-400">
            {timeSince(comment.updatedAt)}
          </p>
        </div>
        {isAuthor && (
          <div className=" ml-auto">
            <p className="text-sm">
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setToggleEdit(true)}
              >
                Edit
              </span>
              {" | "}
              <span
                className="hover:underline cursor-pointer"
                onClick={(e) => commentDeleteHandler(e, comment._id)}
              >
                Delete
              </span>
            </p>
          </div>
        )}
      </div>
      {toggleEdit ? (
        <form onSubmit={(e) => editHandler(e)}>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border-2 mt-2 resize-none"
          />
          <div>
            <button
              type="submit"
              disabled={newContent.trim() === comment.content}
              className={`py-1 px-2 rounded-md ${
                newContent.trim() !== ""
                  ? "bg-blue-400 cursor-pointer hover:shadow-md text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <i
              title="close"
              className="fa fa-times ml-3 cursor-pointer"
              onClick={() => {
                setToggleEdit(false);
                setNewContent(comment.content);
              }}
            ></i>
          </div>
        </form>
      ) : (
        <p className="text-sm mt-2">{newContent}</p>
      )}
    </div>
  );
};

Comment.propTypes = {
  commentDeleteHandler: PropTypes.func,
  comment: PropTypes.object,
};
