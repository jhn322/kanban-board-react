import { useState } from "react";

// Functional component TaskModal with props destructuring
const TaskModal = ({ theme, onClose, onAdd }) => {
  const [title, setTitle] = useState(""); // State for managing task title
  const [text, setText] = useState(""); // State for managing task text

  // Function to handle task creation
  const handleCreateTask = () => {
    if (title && text) {
      // If both title and text are not empty
      onAdd({ title, text }); // Call onAdd function with title and text
      setTitle(""); // Clear title input
      setText("");
      onClose();
    }
  };

  // Function to handle key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // If Enter key is pressed
      handleCreateTask(); // Call handleCreateTask function
    }
  };

  return (
    <div className="add-modal">
      {" "}
      {/* Container for add modal */}
      <div
        className={`add-modal-content ${theme === "alternate" ? "theme" : ""}`}
      >
        <span className="add-close-icon" onClick={onClose}>
          {" "}
          {/* Close icon */}
          &times;
        </span>
        <div
          className={`add-modal-title ${theme === "alternate" ? "theme" : ""}`}
        >
          <h2>New Task</h2> {/* Title of the modal */}
        </div>
        <div className="add-modal-input">
          <div>
            <input
              className={`add-task-title ${
                theme === "alternate" ? "theme" : ""
              }`}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)} // Handle title change
              onKeyDown={handleKeyPress} // Handle key press event
              placeholder="Task title"
            />
            <textarea
              className={`add-task-text ${
                theme === "alternate" ? "theme" : ""
              }`}
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Task text" // Placeholder for text input
            />
          </div>
        </div>
        <div>
          {" "}
          {/* Button section of modal */}
          <button
            className={`add-modal-button ${
              theme === "alternate" ? "theme" : ""
            }`}
            onClick={handleCreateTask}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
