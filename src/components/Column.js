import React from "react";
import Card from "./Card";
import { handleDragOver, handleDrop } from "../utils/utils";

const Column = ({ column, onAddCard, onEditCard, updateCard }) => {
  const handleAddCard = () => {
    onAddCard(null);
  };

  const handleEditCard = (card) => {
    onEditCard(card);
  };

  return (
    <div
      className="col-4"
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, column.id, updateCard)}
    >
      <div className="card">
        <div className="card-header d-flex justify-content-between ">
          <h5>{column.title}</h5>
          <button className="btn btn-primary btn-sm" onClick={handleAddCard}>
            Add Card
          </button>
        </div>
        <div className="card-body">
          {column.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onEditCard={handleEditCard}
              updateCard={updateCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Column;
