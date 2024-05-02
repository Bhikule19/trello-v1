import React, { useState, useEffect } from "react";
import Column from "./Column";
import AddCardModal from "./AddCardModal";

const Board = () => {
  const [columns, setColumns] = useState(() => {
    // Check if there are columns data stored in localStorage
    const savedColumns = localStorage.getItem("columns");
    return savedColumns
      ? JSON.parse(savedColumns)
      : [
          { id: 1, title: "To Do", cards: [] },
          { id: 2, title: "In Progress", cards: [] },
          { id: 3, title: "Done", cards: [] },
        ];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    // Store columns data in localStorage whenever it changes
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const handleAddCard = (card) => {
    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex((col) => col.id === card.columnId);
    newColumns[columnIndex].cards.push(card);
    setColumns(newColumns);
    setShowModal(false);
  };

  const handleEditCard = (updatedCard) => {
    const newColumns = [...columns];
    const oldColumnIndex = newColumns.findIndex((col) =>
      col.cards.some((card) => card.id === updatedCard.id)
    );
    const newColumnIndex = newColumns.findIndex(
      (col) => col.id === updatedCard.columnId
    );

    // Remove the card from the old column
    newColumns[oldColumnIndex].cards = newColumns[oldColumnIndex].cards.filter(
      (card) => card.id !== updatedCard.id
    );

    // Add or update the card in the new column
    const cardIndex = newColumns[newColumnIndex].cards.findIndex(
      (card) => card.id === updatedCard.id
    );
    if (cardIndex === -1) {
      newColumns[newColumnIndex].cards.push(updatedCard);
    } else {
      newColumns[newColumnIndex].cards[cardIndex] = updatedCard;
    }

    setColumns(newColumns);
    setShowModal(false);
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId, columnId) => {
    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex((col) => col.id === columnId);
    newColumns[columnIndex].cards = newColumns[columnIndex].cards.filter(
      (card) => card.id !== cardId
    );
    setColumns(newColumns);
    setShowModal(false);
    setEditingCard(null);
  };

  const handleOpenModal = (card = null) => {
    setEditingCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCard(null);
  };

  const updateCard = (updatedCard) => {
    const newColumns = [...columns];
    const oldColumnIndex = newColumns.findIndex((col) =>
      col.cards.some((card) => card.id === updatedCard.id)
    );
    const newColumnIndex = newColumns.findIndex(
      (col) => col.id === updatedCard.columnId
    );

    // If the card is being dropped in the same column
    if (oldColumnIndex === newColumnIndex) {
      // Remove the card from its current position
      newColumns[oldColumnIndex].cards = newColumns[
        oldColumnIndex
      ].cards.filter((card) => card.id !== updatedCard.id);

      // Add the card to its new position
      const updatedCards = [...newColumns[oldColumnIndex].cards];
      const targetIndex = updatedCards.findIndex(
        (card) => card.id === updatedCard.id
      );
      updatedCards.splice(targetIndex, 0, updatedCard);
      newColumns[oldColumnIndex].cards = updatedCards;
    } else {
      // Remove the card from the old column
      newColumns[oldColumnIndex].cards = newColumns[
        oldColumnIndex
      ].cards.filter((card) => card.id !== updatedCard.id);

      // Add the card to the new column
      newColumns[newColumnIndex].cards.push(updatedCard);
    }

    setColumns(newColumns);
  };

  return (
    <div>
      <heading>
        <h1 className="display-3">Trello Clone</h1>
      </heading>

      <div className="board row">
        {columns.map((column) => (
          <Column
            key={column.id}
            className="col-md-4 col-sm-6"
            column={column}
            onAddCard={handleOpenModal}
            onEditCard={handleOpenModal}
            updateCard={updateCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
      </div>
      <AddCardModal
        show={showModal}
        onClose={handleCloseModal}
        onAddCard={handleAddCard}
        onEditCard={handleEditCard}
        onDeleteCard={handleDeleteCard}
        editingCard={editingCard}
      />
    </div>
  );
};

export default Board;
