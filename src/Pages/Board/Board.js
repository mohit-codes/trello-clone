import React, { useState } from "react";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { PropTypes } from "prop-types";
import { useLocation } from "react-router-dom";
import { CreateList } from "../../Components/createList";
import { List } from "../../Components";

export const Board = () => {
  const {
    state: { object: currentBoard },
  } = useLocation();
  const { _id: boardId } = currentBoard;
  const [showCreateList, setshowCreateList] = useState(false);
  const {
    data: lists,
    addItem: addList,
    removeItem: removeList,
  } = useAxiosGet("boards/lists", boardId);
  console.log(currentBoard);
  return (
    <>
      <div className=" overflow-y-scroll pt-5 px-10 h-full bg-gray-700 text-white">
        <div className="flex">
          <p className="rounded-md max-w-min text-xl bg-gray-600 px-3 py-1">
            {currentBoard.title}
          </p>
          <p className="rounded-md max-w-min text-xl bg-gray-600 px-3 py-1"></p>
        </div>
        <div className="flex flex-row overflow-x-scroll py-3 items-start space-x-3">
          {lists?.map((list, index) => {
            return <List key={index} list={list} removeList={removeList} />;
          })}
          {showCreateList ? (
            <CreateList
              setshowCreateList={setshowCreateList}
              boardId={boardId}
              addList={addList}
            />
          ) : (
            <button
              onClick={() => setshowCreateList(true)}
              className="w-48 h-10 text-white bg-blue-400 rounded-md hover:shadow-md"
            >
              {" Add a list +"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
Board.propTypes = {
  boardId: PropTypes.string,
};
