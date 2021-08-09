import React, { useState } from "react";
import PropTypes from "prop-types";
import { BoardCard } from "./boardCard";
import { CreateBoard } from "./createBoard";
import { useAxiosGet } from "../hooks/useAxiosGet";

export const ProjectBoards = ({ project }) => {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const { addItem: addBoard, data: boards } = useAxiosGet(
    "projects/boards",
    project._id
  );
  return (
    <div>
      <div className="flex flex-wrap">
        {boards?.map((board, index) => {
          return (
            <div key={index}>
              <BoardCard object={board} to="board" />
            </div>
          );
        })}
        {showAddBoardModal ? (
          <CreateBoard
            setShowModal={setShowAddBoardModal}
            addBoard={addBoard}
            projectId={project._id}
          />
        ) : (
          <div
            onClick={() => setShowAddBoardModal(true)}
            className="w-60 h-32 text-center py-12 mt-6 bg-gray-200 text-gray-500 cursor-pointer"
          >
            Create new board...
          </div>
        )}
      </div>
    </div>
  );
};

ProjectBoards.propTypes = {
  project: PropTypes.object,
};

export default ProjectBoards;
