/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CreateProjectModal from "../../Components/modals/createProjectModal";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { useAuth } from "../../Context/AuthProvider";
export const Home = () => {
  const [showAddProjectModal, setshowAddProjectModal] = useState(false);
  const { user } = useAuth();

  const { addItem: addProject, data: projects } = useAxiosGet(
    "projects",
    user._id
  );
  return (
    <>
      <div className="flex-1 min-w-full bg-bggray">
        <section className="flex space-x-10  md:mx-20 lg:mx-48 py-4">
          <div className="hidden md:block space-y-3">
            <ul>
              <li className="text-sm">Boards</li>
            </ul>
            <div className="flex items-center space-x-8">
              <p className="text-lg text-black font-medium">Projects</p>
              <i
                onClick={() => {
                  setshowAddProjectModal(true);
                }}
                className="fa fa-plus text-sm font-thin cursor-pointer"
              />
            </div>
            <ul className="space-y-1">
              {projects?.map((project, index) => {
                return (
                  <li key={index} className="text-sm">
                    <i className="fa fa-users text-sm fa-outlined px-1" />
                    <span>{project.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="flex  justify-between lg:space-x-96">
              <div>
                <i className="fa fa-user-o text-lg px-3" />
                <span>Personal Boards</span>
              </div>
              <button className="bg-blue-500 text-white px-5 py-1 rounded-md space-x-2">
                <i className="fa fa-plus text-sm font-thin" />
                <span>Create</span>
              </button>
            </div>
          </div>
        </section>
        {showAddProjectModal && (
          <CreateProjectModal
            setShowModal={setshowAddProjectModal}
            addProject={addProject}
          />
        )}
      </div>
    </>
  );
};
