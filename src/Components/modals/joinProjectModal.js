/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { blurHandler } from "../../util";
import axios from "axios";

export const JoinProjectModal = ({ setShowJoinProjectModal, addProject }) => {
  useEffect(blurHandler(setShowJoinProjectModal), []);
  const [projectCode, setProjectCode] = useState("");
  const [loading, setLoading] = useState(false);
  const joinHandler = (e) => {
    // axios.post('{')
    e.preventDefault();
    setLoading(true);

    setLoading(false);
  };
  return (
    <div className="z-20 fixed center-modal rounded-md w-96 h-96 bg-white text-black">
      {" "}
      <div className="p-4">
        <p className="font-bold text-xl">Join Project</p>
        <p className="text-gray-500 leading-5 mt-3">
          Join your team members in project and access all boards to start
          collaborating.
        </p>
        <div className="mt-5">
          {" "}
          <p className="font-medium mb-2">Enter Project Code</p>{" "}
          <form onSubmit={(e) => joinHandler(e)}>
            {" "}
            <input
              className=" p-2 w-full border-2"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
            />
            <button
              type="submit"
              disabled={projectCode.trim() === ""}
              className={`w-full p-2 mt-3 text-center rounded-md ${
                projectCode.trim() !== ""
                  ? "bg-blue-500  text-white cursor-pointer"
                  : "bg-gray-200 cursor-not-allowed "
              }`}
            >
              {loading ? "Joining..." : "Join"}
            </button>
          </form>
        </div>
        <i
          title="close"
          className="fas fa-times text-xl absolute top-2 right-4 cursor-pointer"
          onClick={() => setShowJoinProjectModal(false)}
        ></i>
      </div>
    </div>
  );
};

JoinProjectModal.propTypes = {
  setShowJoinProjectModal: PropTypes.func,
  addProject: PropTypes.func,
};
