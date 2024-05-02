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
