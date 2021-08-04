/*eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { CreateCard } from "./index";
import { axiosDelete } from "../util/axiosDelete";

export const List = ({ list, removeList }) => {
  const [showListEditOptions, setshowListEditOptions] = useState("");
  const [showCreateCard, setShowCreateCard] = useState(false);
  const { data: cards, addItem: addCard } = useAxiosGet(
    "lists/cards",
    list._id
  );
  const deleteHandler = async (event) => {
    event.preventDefault();
    await axiosDelete("lists", list._id);
    removeList(list._id);
  };
  return (
    <div className=" p-2 w-64 h-auto flex-shrink-0 space-y-3 bg-blue-400 rounded-md border-2 border-black flex flex-col">
      <div className="flex items-center justify-between ">
        <p>{list.title}</p>
        <div>
          {showListEditOptions && (
            <>
              <i
                title="edit"
                className="fa fa-edit  text-xl cursor-pointer"
              ></i>
              <i
                title="delete"
                className="fa fa-trash  text-xl ml-2 cursor-pointer"
                onClick={(event) => deleteHandler(event)}
              ></i>
            </>
          )}
          <i
            title={showListEditOptions ? "close" : "options"}
            className={`ml-2  text-xl cursor-pointer ${
              showListEditOptions ? "fa fa-times" : "fa fa-ellipsis-h"
            }`}
            onClick={() => setshowListEditOptions((state) => !state)}
          />
        </div>
      </div>
      {cards?.map((card, index) => {
        return (
          <div key={index}>
            <div className="px-3 py-2 h-20 rounded-md hover:shadow-lg cursor-pointer border-2 border-gray-700">
              {card?.title}
            </div>
          </div>
        );
      })}
      {showCreateCard && (
        <CreateCard
          listId={list._id}
          setShowCreateCard={setShowCreateCard}
          addCard={addCard}
        />
      )}
      <button
        onClick={() => setShowCreateCard(true)}
        className="text-center py-2 border-2 border-gray-700 hover:shadow-lg"
      >
        Add Card +
      </button>
    </div>
  );
};
List.propTypes = {
  list: PropTypes.object,
  removeList: PropTypes.func,
};
