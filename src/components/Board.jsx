import { useState, useEffect } from "react";
import { useColumns } from "../components/ColumnContext";
import { useLocation } from "react-router-dom";
import Column from "./Column";
import TaskModal from "./TaskModal";

const Board = () => {
  const { columns, setColumns } = useColumns();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

      localStorage.setItem("columns", JSON.stringify(newColumns));
    }
  };

  const handleDeleteCard = (id, index, columnTitle) => {
    const updatedColumns = columns.map((column) => {
      if (column.title.toLowerCase() === columnTitle.toLowerCase()) {
        const updatedCards = [...column.cards];
        updatedCards.splice(index, 1);
        return {
          ...column,
          cards: updatedCards,
        };
      }
      return column;
    });

    setColumns(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const page = location.pathname.substring(1);
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        filteredColumns.map((column, index) => (
          <Column
            key={column.title}
            title={column.title}
            cards={column.cards}
            isToDo={column.title.toLowerCase() === "to do"}
            onAddTask={handleAddTask}
            onDeleteCard={handleDeleteCard}
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
