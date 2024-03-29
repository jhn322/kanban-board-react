import React, { useState } from "react";
import Column from "./Column";
import CreateTask from "./CreateTask";
import { useColumns } from "../components/ColumnContext";
import { useLocation } from "react-router-dom";

const Board = () => {
  const { columns, setColumns } = useColumns();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = ({ title, text }) => {
    const newColumns = [...columns];
    const todoColumnIndex = newColumns.findIndex(
      (column) => column.title === "To Do"
    );
    if (todoColumnIndex !== -1) {
      newColumns[todoColumnIndex].cards.push({ title, text });
      setColumns(newColumns);
    }
  };

  // Extract the page from the URL
  const page = location.pathname.substring(1);

  return (
    <div className="board">
      {columns.map((column, index) => (
        <Column
          key={index}
          title={column.title}
          cards={column.cards}
          isToDo={column.title === "To Do"}
          onAddTask={() => setIsModalOpen(true)}
        />
      ))}
      {isModalOpen && (
        <CreateTask
          onClose={() => setIsModalOpen(false)}
          onAdd={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Board;
