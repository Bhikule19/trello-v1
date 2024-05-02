<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/ troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
 -->

# Trello Clone App

## Installation

1. Clone the repository from GitHub:

   > git clone https://github.com/Bhikule19/trello-v1

2. Navigate to the project directory:

   > cd trello-v1

3. Install the dependencies:
   > npm install

## Running the Application

To run the application locally, use the following command:

> npm start

## Building Components

The application is built using React components. Here's a brief overview of the main components:

### Board Component

The Board component is the main component that manages the state of the columns and cards. It initializes the columns and cards data from the browser's localStorage, or with a default set of columns if no data is stored.

// src/components/Board.js
const [columns, setColumns] = useState(() => {
const savedColumns = localStorage.getItem("columns");
return savedColumns
? JSON.parse(savedColumns)
: [
{ id: 1, title: "To Do", cards: [] },
{ id: 2, title: "In Progress", cards: [] },
{ id: 3, title: "Done", cards: [] },
];
});

The Board component provides methods for adding, editing, deleting, and updating cards, as well as handling the opening and closing of the modal for these actions.
// src/components/Board.js
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

Column Component

The Column component represents a single column on the board. It renders the column title, an "Add Card" button, and a list of Card components for the cards within the column.
The Column component also handles the drag and drop functionality for moving cards between columns using the handleDragOver and handleDrop utility functions.

Card Component

The Card component represents a single card within a column. It displays the card's title and description, and handles the drag and drop functionality for moving cards within the same column or to other columns.

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

AddCardModal Component

The AddCardModal component is a modal dialog that allows users to add a new card or edit an existing card. It displays input fields for the card's title, description, and the column to which the card should be added or moved.

 <Form onSubmit={handleSubmit} className=" ">
          <Form.Group controlId="formTitle">
            <Form.Label className="fw-bold ">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={titleError} // Add isInvalid prop to highlight the input if there's an error
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
              isInvalid={descriptionError} // Add isInvalid prop to highlight the input if there's an error
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

The AddCardModal component performs input validation to ensure that the title is alphanumeric and the description has at least 25 characters. It also provides buttons for adding/updating a card or deleting an existing card.

Rendering

The Board component is the root component of the application and is responsible for rendering the columns and the AddCardModal component.

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

The Column components are rendered within a CSS grid layout, and each Column component renders its respective cards using the Card component.
Functionality
Adding a Card
To add a new card, click the "Add Card" button in the column where you want to add the card. This will open the AddCardModal component. Enter the title, description, and select the column where you want to add the card, then click the "Add Card" button.

const handleSubmit = (e) => {
e.preventDefault(); // Add this line to prevent default form submission behavior

    const isValidTitle = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(title);
    const isValidDescription = description.length >= 25;


    // Update the titleError and descriptionError states based on validation results
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

Editing a Card

To edit an existing card, click on the card you want to edit. This will open the AddCardModal component with the card's current title, description, and column pre-filled. Make the desired changes and click the "Update Card" button to save the changes.

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

Deleting a Card
To delete a card, open the AddCardModal component by clicking on the card you want to delete. In the modal, click the "Delete Card" button to remove the card from the board.

const handleDelete = () => {
if (editingCard) {
onDeleteCard(editingCard.id, editingCard.columnId);
}
};

Moving Cards
To move a card between columns, simply drag and drop the card onto the desired column. The application uses the handleDragStart, handleDragOver, and handleDrop utility functions to handle the drag and drop functionality.

export const handleDragStart = (e, card) => {
e.dataTransfer.setData("text/plain", JSON.stringify(card));
};

export const handleDragOver = (e) => {
e.preventDefault();
};

export const handleDrop = (e, columnId, updateCard) => {
e.preventDefault();
const card = JSON.parse(e.dataTransfer.getData("text/plain"));
updateCard({ ...card, columnId });
};

Validation
The AddCardModal component now includes validation for the card title and description fields. The validation rules are as follows:

- Title Validation:
  The title should only contain alphabets (uppercase and lowercase) and spaces.
  The title should not start or end with a space.
  The regular expression used for validation is /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.
- Description Validation:
  The description should be at least 25 characters long.

      const isValidTitle = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(title);
      const isValidDescription = description.length >= 25;


      // Update the titleError and descriptionError states based on validation  results
      setTitleError(!isValidTitle);
      setDescriptionError(!isValidDescription);

Data Persistence
The application stores the columns and cards data in the browser's localStorage, ensuring that the data persists across page refreshes or browser sessions.
useEffect(() => {
// Store columns data in localStorage whenever it changes
localStorage.setItem("columns", JSON.stringify(columns));
}, [columns]);
