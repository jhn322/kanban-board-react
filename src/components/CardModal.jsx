import { useState } from "react";

const CardModal = ({
  theme,
  onClose,
  cardInfo,
  creationDate,
  onUpdate,
  onDelete,
}) => {
  const [title, setTitle] = useState(cardInfo.title); // State for managing card title
  const [text, setText] = useState(cardInfo.text); // State for managing card text

  // Function to handle title change
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update title state with new value
  };

  // Function to handle text change
  const handleTextChange = (event) => {
    setText(event.target.value); // Update text state with new value
  };

  // Function to handle key down event
  const handleKeyDown = (event) => {
    // If Enter key is pressed
    if (event.key === "Enter") {
      handleUpdate(); // Call handleUpdate function
    }
  };

  // Function to handle card update
  const handleUpdate = () => {
    onUpdate(title, text); // Call onUpdate function with updated title and text
    onClose(); // Close the modal
  };

  // Function to handle card deletion
  const handleDelete = () => {
    onDelete(cardInfo.id); // Call onDelete function with card ID
    onClose();
  };

  return (
    <div className="card-modal">
      {" "}
      {/* Container for card modal */}
      <div
        className={`card-modal-content ${theme === "alternate" ? "theme" : ""}`} // Dynamically set class based on theme
      >
        <div
          className={`card-modal-title ${theme === "alternate" ? "theme" : ""}`}
        >
          <h2>Edit Card</h2>
          <span className="card-close-icon" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="card-modal-input">
          <div>
            <input
              className={`card-task-title ${
                theme === "alternate" ? "theme" : ""
              }`}
              type="text"
              id="title"
              value={title} // Current value of title
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown} // Handle key down event
              placeholder="Edit title"
            />
            <textarea
              className={`card-task-text ${
                theme === "alternate" ? "theme" : ""
              }`}
              id="text"
              value={text} // Current value of text
              onChange={handleTextChange} // Handle text change
              onKeyDown={handleKeyDown}
              placeholder="Edit text" // Placeholder for text input
            ></textarea>
          </div>
        </div>
        <div className="card-modal-buttons">
          {" "}
          {/* Button section of modal */}
          <button
            className={`card-modal-update-button ${
              theme === "alternate" ? "theme" : ""
            }`}
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className={`card-modal-delete-button ${
              theme === "alternate" ? "theme" : ""
            }`}
            onClick={handleDelete} // Handle delete button click
          >
            Delete
          </button>
        </div>
        <div className="card-modal-info">
          <p
            className={`card-modal-date ${
              theme === "alternate" ? "theme" : ""
            }`}
          >
            Created on: {creationDate} {/* Display creation date */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
