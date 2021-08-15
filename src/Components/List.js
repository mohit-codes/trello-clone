import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { CreateCard } from "./index";
import { axiosDelete, backendUrl } from "../util/index";
import axios from "axios";
import { ListCard } from "./listCard";
import { useAuth } from "../Context/AuthProvider";
import { Loading } from "./loading";

export const List = ({ list, removeList, projectAdmin }) => {
  const [listState, setListState] = useState(list);
  const [showListEditOptions, setshowListEditOptions] = useState("");
  const [showCreateCard, setShowCreateCard] = useState(false);
  const { user } = useAuth();
  const isAdmin = projectAdmin === undefined ? true : projectAdmin === user._id;
  const [newTitle, setNewTitle] = useState(list.title);

  const {
    data: cards,
    addItem: addCard,
    removeItem: removeCard,
    loading: loadingCards,
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
    <div className="mr-3 p-2 w-64 h-auto flex-shrink-0 space-y-3 bg-blue-400 rounded-md border-2 border-black flex flex-col">
      <div className="flex items-center justify-between ">
        <p>
          {isAdmin ? (
            <input
              type="text"
              className="px-1 border-none outline-none w-40 font-medium focus:font-thin bg-transparent focus:bg-white focus:text-black "
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
              onBlur={(event) => editHandler(event)}
            />
          ) : (
            <span>{newTitle}</span>
          )}
        </p>
        <div>
          {showListEditOptions && (
            <i
              className={`fa fa-trash  text-xl ml-2 ${
                isAdmin ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isAdmin ? (event) => deleteHandler(event) : null}
            ></i>
          )}
          <i
            className={`ml-2  text-xl cursor-pointer ${
              showListEditOptions ? "fa fa-times" : "fa fa-ellipsis-h"
            }`}
            onClick={() => setshowListEditOptions((state) => !state)}
          />
        </div>
      </div>
      {loadingCards ? (
        <Loading />
      ) : (
        cards?.map((card) => {
          return (
            <ListCard
              key={card._id}
              list={listState}
              removeCard={removeCard}
              card={card}
              projectAdmin={projectAdmin}
            />
          );
        })
      )}
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
  projectAdmin: PropTypes.string,
};
