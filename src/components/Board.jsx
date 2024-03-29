import { useState } from "react";
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
      (column) => column.title.toLowerCase() === "to do"
    );
    if (todoColumnIndex !== -1) {
      newColumns[todoColumnIndex].cards.push({ title, text });
      setColumns(newColumns);
    }
  };

  // Extract the page from the URL
  const page = location.pathname.substring(1);

  // Filter columns based on the route
  const filteredColumns =
    page === ""
      ? columns
      : columns.filter(
          (column) =>
            column.title.toLowerCase() === page.toLowerCase() ||
            column.title.toLowerCase().replace(" ", "") === page.toLowerCase()
        );

  return (
    <div className="board">
      {filteredColumns.map((column, index) => (
        <Column
          key={index}
          title={column.title}
          cards={column.cards}
          isToDo={column.title.toLowerCase() === "to do"}
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
