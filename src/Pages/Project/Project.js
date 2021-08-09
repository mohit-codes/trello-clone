import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ProjectBoards } from "../../Components";
import { useAuth } from "../../Context/AuthProvider";

export const Project = () => {
  const { projectId } = useParams();
  const {
    state: { object: project },
  } = useLocation();
  const { user } = useAuth();
  const isAdmin = project.adminId === user._id;
  const [selectedTab, setSelectedTab] = useState(1);
  console.log(projectId);
  return (
    <div>
      <div className="h-64 bg-gray-700 flex flex-col">
        <div className="flex mr-auto ml-auto">
          <div className="px-3 py-4 w-28 h-28 rounded-md bg-gray-200 mt-5">
            {" "}
            <i className="fa fa-users text-7xl"></i>
          </div>
          <div className="lg:w-600 md:w-600 ml-4 text-white mt-5">
            <p className="text-3xl font-bold tracking-wide">{project.title}</p>
            <p className="text-xl mt-3 mb-5 tracking-wide">
              {" "}
              {project.description}
            </p>
            {isAdmin && (
              <p className="bg-gray-200 w-48 p-1 px-2 font-medium text-black rounded-sm">
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
      {selectedTab === 2 && <div>tab 2</div>}
      {selectedTab === 3 && <div>tab </div>}
    </div>
  );
};
