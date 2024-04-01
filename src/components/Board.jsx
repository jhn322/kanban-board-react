import { useState, useEffect } from "react";
import { useColumns } from "../components/ColumnContext";
import { useLocation } from "react-router-dom";
import Column from "./Column";
import TaskModal from "./TaskModal";

const Board = () => {
  const { columns, setColumns } = useColumns();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Added a loading state because Column component rendered before localStorage loaded
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to retrieve columns data from localStorage
  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem("columns"));
    if (savedColumns) {
      setColumns(savedColumns);
    }
    setIsLoading(false);
  }, []);

  const handleCreateTask = ({ title, text }) => {
    const newColumns = [...columns];
    const todoColumnIndex = newColumns.findIndex(
      (column) => column.title.toLowerCase() === "to do"
    );
    if (todoColumnIndex !== -1) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}`;

      newColumns[todoColumnIndex].cards.push({
        title,
        text,
        creationDate: formattedDate,
      });
      setColumns(newColumns);

      // Update localStorage with the new columns data
      localStorage.setItem("columns", JSON.stringify(newColumns));
    }
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
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
      {isLoading ? ( // Show loading indicator while data is being retrieved
        <div>Loading...</div>
      ) : (
        filteredColumns.map((column, index) => (
          <Column
            key={column.title}
            title={column.title}
            cards={column.cards}
            isToDo={column.title.toLowerCase() === "to do"}
            onAddTask={handleAddTask}
          />
        ))
      )}
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Board;
