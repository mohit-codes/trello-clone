import React, { useState } from "react";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { PropTypes } from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { CreateList } from "../../Components/createList";
import { List } from "../../Components";

export const Board = () => {
  const { boardId } = useParams();
  const {
    state: { title },
  } = useLocation();
  const [showCreateList, setshowCreateList] = useState(false);
  const { data: lists, addItem: addList } = useAxiosGet(
    "boards/lists",
    boardId
  );
  return (
    <>
      <div className="pt-5 px-10 h-full bg-gray-700 text-white">
        <div>
          <p className="text-2xl">{title}</p>
        </div>
        <div className="flex flex-row py-3 space-x-3">
          {lists?.map((list, index) => {
            return <List key={index} list={list} />;
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
              className="w-48 h-10 text-white bg-blue-500 rounded-md hover:shadow-md"
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
