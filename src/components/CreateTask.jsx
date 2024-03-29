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
        <h2>Add New Task</h2>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
        />
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Task description"
        />
        <button onClick={handleCreateTask}>Add</button>
      </div>
    </div>
  );
};

export default CreateTask;
