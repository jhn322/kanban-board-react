import { useState } from "react";

const TaskModal = ({ onClose, onAdd }) => {
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
      <div className="add-modal-content">
        <span className="add-close-icon" onClick={onClose}>
          &times;
        </span>
        <div className="add-modal-title">
          <h2>New Task</h2>
        </div>
        <div className="add-modal-input">
          <div>
            <input
              className="add-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Task title"
            />
            <textarea
              className="add-task-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Task text"
            />
          </div>
        </div>
        <div>
          <button className="add-modal-button" onClick={handleCreateTask}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
