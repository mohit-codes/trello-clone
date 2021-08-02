/*eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useAxiosGet } from "../hooks/useAxiosGet";
export const List = ({ list }) => {
  const [showListEditOptions, setshowListEditOptions] = useState("");
  const { data: cards, addItem: addCard } = useAxiosGet(
    "lists/cards",
    list._id
  );
  return (
    <div className="max-h-96 p-2 w-64 bg-blue-400 rounded-md border-2 border-black flex flex-col">
      <div className="flex items-center justify-between">
        <p>{list.title}</p>
        {showListEditOptions && (
          <div className="fixed mt-6 w-10 h-10 bg-white"></div>
        )}
        <i
          title="close"
          className="fa fa-ellipsis-h ml-2 font-thin text-xl cursor-pointer"
          onClick={() => setshowListEditOptions((state) => !state)}
        ></i>
      </div>
      {cards?.map((card, index) => {
        return <div key={index}>card.title</div>;
      })}
      <button className="mt-16 text hover:shadow-md py-2">Add Card +</button>
    </div>
  );
};
List.propTypes = {
  list: PropTypes.object,
};
