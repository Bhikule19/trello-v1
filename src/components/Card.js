import React from "react";
import { handleDragStart } from "../utils/utils";

const Card = ({ card, onEditCard }) => {
  const handleEditCard = () => {
    onEditCard(card);
  };

  return (
    <div
      className="card mb-3"
      onClick={handleEditCard}
      draggable
      onDragStart={(e) => handleDragStart(e, card)}
    >
      <div className="card-body">
        <h5 className="card-title">{card.title}</h5>
        <p className="card-text">{card.description}</p>
      </div>
    </div>
  );
};

export default Card;
