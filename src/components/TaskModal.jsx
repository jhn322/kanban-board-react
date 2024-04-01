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

  return (
    <div className="add-modal">
      <div className="add-modal-content">
        <span className="add-close-icon" onClick={onClose}>
          &times;
        </span>
        <div className="add-modal-title">
          <h2>To Do</h2>
        </div>
        <div className="add-modal-input">
          <div className="add-input-wrapper">
            <input
              className="add-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Task title"
            />
            <textarea
              className="add-task-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
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
