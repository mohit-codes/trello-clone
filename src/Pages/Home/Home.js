import React, { useState } from "react";
import { CreateProjectModal, CreateBoard } from "../../Components";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { useAuth } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
export const Home = () => {
  const [showAddProjectModal, setshowAddProjectModal] = useState(false);
  const [showAddBoardModal, setshowAddBoardModal] = useState(false);
  const { user } = useAuth();
  const { addItem: addProject, data: projects } = useAxiosGet(
    "projects",
    user._id
  );
  const { addItem: addBoard, data: boards } = useAxiosGet("boards", user._id);
  return (
    <>
      <div className="flex-1 min-w-full bg-bggray">
        <section className="space-y-5 px-10 py-5">
          <div className="">
            <div>
              <i className="fa fa-user-o text-lg mr-3" />
              <span className="text-xl text-black font-medium">
                Personal Boards
              </span>
            </div>
            <div className="flex flex-wrap">
              {boards?.map(({ _id, title }, index) => {
                return (
                  <Link key={index} to={`/board/${_id}`} state={{ title }}>
                    <div className="p-2 w-60 h-32 mr-5 mt-6 border-2 border-black  hover:shadow-lg cursor-pointer">
                      {title}
                    </div>
                  </Link>
                );
              })}
              {showAddBoardModal ? (
                <CreateBoard
                  setShowModal={setshowAddBoardModal}
                  addBoard={addBoard}
                />
              ) : (
                <div
                  onClick={() => setshowAddBoardModal(true)}
                  className="w-60 h-32 text-center py-12 mt-6 bg-gray-200 text-gray-500 cursor-pointer"
                >
                  Create new board...
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div>
              <i className="fa fa-users fa-outlined text-lg mr-3" />
              <span className="text-xl text-black font-medium">
                Teams/Projects
              </span>
            </div>
            <div className="flex flex-wrap">
              {projects?.map((project, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 w-60 h-32 mr-5 mt-6 border-2 border-black  hover:shadow-lg cursor-pointer"
                  >
                    {project.title}
                  </div>
                );
              })}
              <div
                onClick={() => {
                  setshowAddProjectModal(true);
                }}
                className="w-60 h-32 text-center py-12 mt-6 bg-gray-200 text-gray-500 cursor-pointer"
              >
                Create new project...
              </div>
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
