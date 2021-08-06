import React, { useState } from "react";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { PropTypes } from "prop-types";
import { useLocation } from "react-router-dom";
import { CreateList } from "../../Components/createList";
import { BoardMenuModal, List } from "../../Components";

export const Board = () => {
  const {
    state: { object: currentBoard },
  } = useLocation();

  const [board, setBoard] = useState(currentBoard);
  const { _id: boardId } = board;
  const [showCreateList, setShowCreateList] = useState(false);
  const {
    data: lists,
    addItem: addList,
    removeItem: removeList,
  } = useAxiosGet("boards/lists", boardId);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className=" overflow-y-auto pt-5 px-10 h-full bg-gray-700 text-white">
        <div className="flex flex-row">
          <p className="rounded-md max-w-min text-xl bg-gray-600 px-3 py-1 font-semibold">
            {board.title}
          </p>
          {board?.projectId === undefined && (
            <p className="rounded-md ml-5 text-lg bg-gray-600 px-3 py-1">
              <i className="fa fa-lock mr-3"></i>
              <span>Private</span>
            </p>
          )}
          <p
            onClick={() => setShowMenu(true)}
            className="py-1 ml-auto cursor-pointer"
          >
            <i className="fa fa-chevron-left mr-2"></i>
            <span>Show Menu</span>
          </p>
        </div>
        <div className="flex flex-row overflow-x-auto flex-shrink-0 py-3 items-start space-x-3">
          {lists?.map((list, index) => {
            return <List key={index} list={list} removeList={removeList} />;
          })}
          {showCreateList ? (
            <CreateList
              setShowCreateList={setShowCreateList}
              boardId={boardId}
              addList={addList}
            />
          ) : (
            <button
              onClick={() => setShowCreateList(true)}
              className="w-48 h-10 text-white bg-blue-400 rounded-md hover:shadow-md"
            >
              {" Add a list +"}
            </button>
          )}
        </div>
      </div>
      {showMenu && (
        <BoardMenuModal
          board={board}
          setBoard={setBoard}
          setShowMenu={setShowMenu}
        />
      )}
    </>
  );
};
Board.propTypes = {
  boardId: PropTypes.string,
};
