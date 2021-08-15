/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Members, ProjectBoards } from "../../Components";
import ProjectSettings from "../../Components/projectComponents/projectSettings";
import { useAuth } from "../../Context/AuthProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export const Project = () => {
  const { projectId } = useParams();
  const {
    state: { object: project },
  } = useLocation();
  const { user } = useAuth();
  const [projectState, setProjectState] = useState(project);
  const isAdmin = project.adminId === user._id;
  const [selectedTab, setSelectedTab] = useState(1);

  useDocumentTitle(`${project.title}  |  Trello`);
  return (
    <div>
      <div className="h-64 bg-gray-700 flex flex-col">
        <div className="flex mr-auto ml-auto">
          <div className="py-2 px-2  w-14 h-14 md:px-3 md:py-4 md:w-28 md:h-28 rounded-md bg-gray-200 mt-5">
            {" "}
            <i className="fa fa-users text-3xl md:text-7xl"></i>
          </div>
          <div className="lg:w-600 md:w-600 ml-4 text-white mt-5">
            <p className="text-3xl font-bold tracking-wide">
              {projectState.title}
            </p>
            <p className="text-xl mt-3 mb-5 tracking-wide">
              {" "}
              {projectState.description}
            </p>
            {isAdmin && (
              <p
                onClick={() => setSelectedTab(3)}
                className="bg-gray-200 w-48 p-1 px-2 font-medium text-black rounded-sm cursor-pointer"
              >
                <i className="fas fa-pen mr-2 " /> Edit Project Profile
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-3 mt-auto mr-auto ml-auto">
          <div
            onClick={() => setSelectedTab(1)}
            className={`project-tabs ${
              selectedTab === 1 ? "bg-white" : "bg-gray-300"
            }`}
          >
            Boards
          </div>
          <div
            onClick={() => setSelectedTab(2)}
            className={`project-tabs ${
              selectedTab === 2 ? "bg-white" : "bg-gray-300"
            }`}
          >
            Members
          </div>
          <div
            onClick={() => setSelectedTab(3)}
            className={`project-tabs ${
              selectedTab === 3 ? "bg-white" : "bg-gray-300"
            }`}
          >
            Settings
          </div>
        </div>
      </div>
      {selectedTab === 1 && <ProjectBoards project={project} />}
      {selectedTab === 2 && <Members project={project} />}
      {selectedTab === 3 && (
        <div className="ml-auto py-10 mr-auto w-300 md:w-500 md:px-10">
          {isAdmin ? (
            <ProjectSettings
              project={projectState}
              setProject={setProjectState}
            />
          ) : (
            <div className="text-red-400">Feature Only Available for Admin</div>
          )}
        </div>
      )}
    </div>
  );
};
