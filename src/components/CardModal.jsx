import { useState } from "react";

const CardModal = ({ onClose, cardInfo, creationDate, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(cardInfo.title);
  const [text, setText] = useState(cardInfo.text);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  const handleUpdate = () => {
    onUpdate(title, text);
    onClose();
  };

  const handleDelete = () => {
    onDelete(cardInfo.id);
    onClose();
  };

  return (
    <div className="card-modal">
      <div className="card-modal-content">
        <div className="card-modal-title">
          <h2>Edit Card</h2>
          <span className="card-close-icon" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="card-modal-info">
          <p className="card-modal-date">Created on: {creationDate}</p>
        </div>
        <div className="card-modal-input">
          <div>
            <input
              className="card-task-title"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              placeholder="Edit title"
            />
            <textarea
              className="card-task-text"
              id="text"
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder="Edit text"
            ></textarea>
          </div>
        </div>
        <div className="card-modal-buttons">
          <button className="card-modal-update-button" onClick={handleUpdate}>
            Update
          </button>
          <button className="card-modal-delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
