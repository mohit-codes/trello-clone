import React, { useState } from "react";
import PropTypes from "prop-types";
import { CardModal } from "./index";

export const ListCard = ({ list, card, removeCard, projectAdmin }) => {
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardState, setCardState] = useState(card);
  return (
    <>
      <div
        onClick={() => setShowCardModal(true)}
        className="px-3 py-2 break-words min-h-5rem rounded-md hover:shadow-lg cursor-pointer border-2 border-gray-700"
      >
        {cardState.title}
      </div>
      {showCardModal && (
        <CardModal
          list={list}
          card={cardState}
          setCardState={setCardState}
          setShowCardModal={setShowCardModal}
          removeCard={removeCard}
          projectAdmin={projectAdmin}
        />
      )}
    </>
  );
};
ListCard.propTypes = {
  card: PropTypes.object,
  setShowCardModal: PropTypes.func,
  list: PropTypes.object,
  removeCard: PropTypes.func,
  projectAdmin: PropTypes.string,
};
