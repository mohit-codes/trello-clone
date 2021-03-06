/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { blurHandler } from "../../util/blurHandler";
import PropTypes from "prop-types";
import team from "../../assets/team.svg";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";
import { backendUrl } from "../../util/constant";

export const CreateProjectModal = ({ setShowModal, addProject }) => {
  useEffect(blurHandler(setShowModal), []);
  const { user } = useAuth();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setProjectTitle("");
    setProjectDescription("");
    const { data: data } = await axios.post(backendUrl + "/projects/create", {
      title: projectTitle,
      description: projectDescription,
      userId: user._id,
    });
    addProject(data.project);
    setShowModal(false);
  };

  return (
    <div className="fixed z-20 text-black bg-white flex rounded-sm center-modal w-80 lg:max-w-900 lg:w-800 max-h-96">
      <div className="px-7 pb-7 pt-3">
        <p className="font-bold md:text-xl mb-2">Start a Project</p>
        <p className="text-gray-500 leading-5">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
        <form onSubmit={(e) => submitHandler(e)} className="flex-1 py-2">
          <div>
            <label className="block">Project Title</label>
            <input
              type="text"
              name="title"
              title="title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="focus:border-blue-600 border-2 border-gray-400 outline-none w-full"
            />
          </div>
          <div>
            <label>Project Description</label>
            <textarea
              name="description"
              title="description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="focus:border-blue-600 border-2 border-gray-400 outline-none w-full resize-none"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={projectTitle.trim() === ""}
            className={`w-full p-2 mt-3 text-center rounded-md ${
              projectTitle.trim() !== ""
                ? "bg-blue-500  text-white cursor-pointer"
                : "bg-gray-200 cursor-not-allowed "
            }`}
          >
            Create Project
          </button>
        </form>
      </div>
      <div className="hidden lg:flex  ">
        <i
          title="close"
          className="fas fa-times text-xl absolute top-2 right-4 cursor-pointer"
          onClick={() => setShowModal(false)}
        ></i>
        <img src={team} className="w-2/3 mx-auto" />
      </div>
    </div>
  );
};

CreateProjectModal.propTypes = {
  setShowModal: PropTypes.func,
  addProject: PropTypes.func,
};
