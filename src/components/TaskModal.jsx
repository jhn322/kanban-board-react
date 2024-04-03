import { useState } from "react";

const TaskModal = ({ theme, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleCreateTask = () => {
    if (title && text) {
      onAdd({ title, text });
      setTitle("");
      setText("");
      onClose();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCreateTask();
    }
  };

  return (
    <div className="add-modal">
      <div
        className={`add-modal-content ${theme === "alternate" ? "theme" : ""}`}
      >
        <span className="add-close-icon" onClick={onClose}>
          &times;
        </span>
        <div
          className={`add-modal-title ${theme === "alternate" ? "theme" : ""}`}
        >
          <h2>New Task</h2>
        </div>
        <div className="add-modal-input">
          <div>
            <input
              className={`add-task-title ${
                theme === "alternate" ? "theme" : ""
              }`}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Task title"
            />
            <textarea
              className={`add-task-text ${
                theme === "alternate" ? "theme" : ""
              }`}
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Task text"
            />
          </div>
        </div>
        <div>
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
