import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from "../util";
import { useAuth } from "../Context/AuthProvider";

export const AddComment = ({ addCommentItem, card }) => {
  const { user } = useAuth();
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const addCommentHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data: data } = await axios.post(`${backendUrl}/comments/create`, {
      content: commentContent,
      author: user.username,
      cardId: card._id,
    });
    addCommentItem(data.comment);
    setLoading(false);
  };
  return (
    <div className="flex mt-5 w-52">
      <div>
        <i className="far fa-comment text-gray-400 text-lg" />
      </div>
      <form className="ml-4" onSubmit={(e) => addCommentHandler(e)}>
        <p className="text-gray-400">
          <span className="">Add comment</span>
        </p>
        <textarea
          className="p-1 text-sm resize-none border-2 mt-2 w-80 h-20"
          placeholder="Leave a comment..."
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
        />
        <button
          type="submit"
          disabled={commentContent.trim() === ""}
          className={`py-1 px-2 rounded-md ${
            commentContent !== ""
              ? "bg-blue-400 cursor-pointer hover:shadow-md text-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};
AddComment.propTypes = {
  addCommentItem: PropTypes.func,
  card: PropTypes.object,
};
