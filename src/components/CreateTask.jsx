import { useState } from "react";

const CreateTask = ({ onClose, onAdd }) => {
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
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-title">
          <h2>To Do</h2>
        </div>
        <div className="modal-input">
          <div className="input-wrapper">
            <input
              className="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Task title"
            />
            <textarea
              className="task-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Task text"
            />
          </div>
        </div>
        <div>
          <button className="modal-button" onClick={handleCreateTask}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
