import React, { useEffect, useState } from "react";
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
    const columnIndex = newColumns.findIndex(
      (col) => col.id === updatedCard.columnId
    );
    const cardIndex = newColumns[columnIndex].cards.findIndex(
      (card) => card.id === updatedCard.id
    );
    newColumns[columnIndex].cards[cardIndex] = updatedCard;
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

    // Remove the card from the old column
    newColumns[oldColumnIndex].cards = newColumns[oldColumnIndex].cards.filter(
      (card) => card.id !== updatedCard.id
    );

    // Add the card to the new column
    newColumns[newColumnIndex].cards.push(updatedCard);

    setColumns(newColumns);
  };

  return (
    <div>
      <h1>Trello Clone</h1>
      <div className="d-flex gap-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddCard={handleOpenModal}
            onEditCard={handleOpenModal}
            updateCard={updateCard}
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
