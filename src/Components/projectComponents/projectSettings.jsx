import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { axiosDelete, backendUrl, formatDate } from "../../util";
import { useNavigate } from "react-router-dom";

const ProjectSettings = ({ project, setProject }) => {
  const navigate = useNavigate();
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);

  const date = formatDate(project.createdAt);

  const [newTitle, setNewTitle] = useState(project.title);
  const [newDescription, setNewDescription] = useState(project.description);

  const [loading, setLoading] = useState(false);

  const deleteHandler = async (e) => {
    e.preventDefault();
    await axiosDelete("projects", project._id);
    navigate("/", true);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`${backendUrl}/projects/${project._id}`, {
      title: newTitle,
      description: newDescription,
    });
    setProject({ ...project, title: newTitle, description: newDescription });
    setShowDescriptionEdit(false);
    setShowTitleEdit(false);
    setLoading(false);
  };
  return (
    <form action="" onSubmit={(e) => editHandler(e)}>
      <div className="flex justify-between mb-2">
        <p className="text-lg font-medium">Created on :</p> <p>{date}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg font-medium">Project Unique Code :</p>{" "}
        <p>{project.projectCode}</p>
      </div>
      <div className="my-5">
        <div className="flex justify-between">
          {" "}
          <label htmlFor="title" className="text-lg font-medium">
            Project Title{" "}
          </label>{" "}
          <span
            onClick={() => setShowTitleEdit(true)}
            className="cursor-pointer"
          >
            <i className="fas fa-edit " /> Edit
          </span>
        </div>
        {showTitleEdit ? (
          <>
            {" "}
            <input
              id="title"
              type="text"
              className="flex border-2 p-1 border-black my-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              type="submit"
              disabled={newTitle === project.title}
              className={`py-1 px-2 rounded-md ${
                newTitle !== project.title
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
                setShowTitleEdit(false);
                setNewTitle(project.title);
              }}
            ></i>{" "}
          </>
        ) : (
          <p>{newTitle}</p>
        )}
      </div>
      <div>
        <div className="flex justify-between">
          {" "}
          <label htmlFor="description" className="text-lg font-medium">
            Project Description{" "}
          </label>{" "}
          <span
            onClick={() => setShowDescriptionEdit(true)}
            className="cursor-pointer"
          >
            <i className="fas fa-edit " /> Edit
          </span>
        </div>
        {showDescriptionEdit ? (
          <>
            <textarea
              type="text"
              id="description"
              className="flex resize-none border-2 w-full my-2 p-1 border-black"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button
              type="submit"
              disabled={newDescription === project.description}
              className={`py-1 px-2 rounded-md ${
                newDescription !== project.description
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
                setShowDescriptionEdit(false);
                setNewDescription(project.description);
              }}
            ></i>
          </>
        ) : (
          <p>{project.description}</p>
        )}
      </div>
      <div className=" mt-5">
        <button
          onClick={(e) => deleteHandler(e)}
          className=" text-center text-red-600 border-2 border-red-600 rounded-md p-2 float-right hover:shadow-md"
        >
          Delete Project <i className="fas fa-trash"></i>
        </button>
      </div>
    </form>
  );
};

ProjectSettings.propTypes = {
  project: PropTypes.object,
  setProject: PropTypes.func,
};

export default ProjectSettings;
