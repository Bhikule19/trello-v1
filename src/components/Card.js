import React from "react";
import { Card } from "react-bootstrap";
import { handleDragStart } from "../utils/utility";

const CardComponent = ({ card, onEditCard, updateCard }) => {
  const handleEditCard = () => {
    onEditCard(card);
  };

  return (
    <Card
      className="mb-3 draggable"
      onClick={handleEditCard}
      draggable
      onDragStart={(e) => handleDragStart(e, card)}
    >
      <Card.Body className="shadow">
        <Card.Title>{card.title}</Card.Title>
        <Card.Text>{card.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
