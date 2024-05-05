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
  const [titleError, setTitleError] = useState(false); // State to manage title validation
  const [descriptionError, setDescriptionError] = useState(false); // State to manage description validation

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
    e.preventDefault();

    const isValidTitle = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(title);
    const isValidDescription = description.length >= 25;

    // Updating the titleError and descriptionError states based on validation results
    setTitleError(!isValidTitle);
    setDescriptionError(!isValidDescription);

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
        <Form onSubmit={handleSubmit} className=" ">
          <Form.Group controlId="formTitle">
            <Form.Label className="fw-bold ">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={titleError}
            />
            {/* Show validation text if title is invalid */}
            <Form.Control.Feedback type="invalid">
              Title should only contain alphabets.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label className="fw-bold ">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={descriptionError}
            />
            {/* Show validation text if description is invalid */}
            <Form.Control.Feedback type="invalid">
              Description should be at least 25 characters long.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formColumn" className="mt-3">
            <Form.Label className="fw-bold ">Select Status</Form.Label>
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

          <div className="d-flex justify-content-between  ">
            <Button variant="primary " type="submit" className="mt-3 shadow ">
              {editingCard ? "Update Card" : "Add Card"}
            </Button>
            {editingCard && (
              <Button
                variant="danger"
                onClick={handleDelete}
                className="ml-2 mt-3"
              >
                Delete Card
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCardModal;
