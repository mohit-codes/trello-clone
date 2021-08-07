import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { CreateCard } from "./index";
import { axiosDelete, backendUrl } from "../util/index";
import axios from "axios";
import { Card } from "./card";

export const List = ({ list, removeList }) => {
  const [listState, setListState] = useState(list);
  const [showListEditOptions, setshowListEditOptions] = useState("");
  const [showCreateCard, setShowCreateCard] = useState(false);

  const [newTitle, setNewTitle] = useState(list.title);
  const {
    data: cards,
    addItem: addCard,
    removeItem: removeCard,
  } = useAxiosGet("lists/cards", listState._id);
  const editHandler = async (e) => {
    e.preventDefault();
    await axios.put(`${backendUrl}/lists/${list._id}`, {
      title: newTitle,
    });
    setListState({ ...list, title: newTitle });
  };
  const deleteHandler = async (event) => {
    event.preventDefault();
    await axiosDelete("lists", listState._id);
    removeList(listState._id);
  };

  return (
    <div className=" p-2 w-64 h-auto flex-shrink-0 space-y-3 bg-blue-400 rounded-md border-2 border-black flex flex-col">
      <div className="flex items-center justify-between ">
        <p>
          <input
            type="text"
            className="px-1 border-none outline-none w-40 font-medium focus:font-thin bg-transparent focus:bg-white focus:text-black "
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            onBlur={(event) => editHandler(event)}
          />
        </p>
        <div>
          {showListEditOptions && (
            <>
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
          <Card
            key={index}
            list={listState}
            removeCard={removeCard}
            card={card}
          />
        );
      })}
      {showCreateCard && (
        <CreateCard
          listId={listState._id}
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
  setShowCreateList: PropTypes.func,
};
