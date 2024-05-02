import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { handleDragOver, handleDrop } from "../utils/utils";
import CardComponent from "./Card";

const Column = ({ column, onAddCard, onEditCard, updateCard }) => {
  const handleAddCard = () => {
    onAddCard(null);
  };

  const handleEditCard = (card) => {
    onEditCard(card);
  };

  return (
    <div
      className="col-4 h-100"
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, column.id, updateCard)}
    >
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>{column.title}</Card.Title>
          <Button
            variant="dark "
            size="sm"
            onClick={handleAddCard}
            className="shadow rounded-3"
          >
            Add Card
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          {column.cards.map((card) => (
            <ListGroup.Item key={card.id}>
              <CardComponent
                card={card}
                onEditCard={handleEditCard}
                updateCard={updateCard}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default Column;
