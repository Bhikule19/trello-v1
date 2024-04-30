// src/components/AddCardModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCardModal = ({
  show,
  onClose,
  onAddCard,
  onEditCard,
  onDeleteCard,
  editingCard,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState(1);

  useEffect(() => {
    if (editingCard) {
      setTitle(editingCard.title);
      setDescription(editingCard.description);
      setColumnId(editingCard.columnId);
    } else {
      setTitle("");
      setDescription("");
      setColumnId(1);
    }
  }, [editingCard]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Add this line to prevent default form submission behavior

    const isValidTitle = /^[a-zA-Z]+$/.test(title);
    const isValidDescription = description.length >= 25;

    if (isValidTitle && isValidDescription) {
      const card = {
        id: editingCard ? editingCard.id : Date.now(),
        title,
        description,
        columnId,
      };

      if (editingCard) {
        onEditCard(card);
      } else {
        onAddCard(card);
      }

      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setColumnId(1);
    } else {
      // Show error messages or handle validation errors
      console.log("Invalid input");
    }
  };

  const handleDelete = () => {
    if (editingCard) {
      onDeleteCard(editingCard.id, editingCard.columnId);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editingCard ? "Edit Card" : "Add Card"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formColumn">
            <Form.Label>Column</Form.Label>
            <Form.Control
              as="select"
              value={columnId}
              onChange={(e) => setColumnId(parseInt(e.target.value))}
            >
              <option value={1}>To Do</option>
              <option value={2}>In Progress</option>
              <option value={3}>Done</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {editingCard ? "Update Card" : "Add Card"}
          </Button>
          {editingCard && (
            <Button variant="danger" onClick={handleDelete} className="ml-2">
              Delete Card
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCardModal;
