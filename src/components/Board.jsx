import { useState, useEffect } from "react";
import { useColumns } from "../components/ColumnContext";
import { useLocation } from "react-router-dom";
import Column from "./Column";
import TaskModal from "./TaskModal";
import CardModal from "./CardModal";

const Board = () => {
  const { columns, setColumns } = useColumns();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCardInfo, setEditCardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem("columns"));
    if (savedColumns) {
      setColumns(savedColumns);
    }
    setIsLoading(false);
  }, []);

  const handleEditCard = (id, title, text) => {
    setIsModalOpen(true);
    setEditCardInfo({ id, title, text });
  };

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

      const generateUniqueId = () => {
        return "_" + Math.random().toString(36).substr(2, 9);
      };

      const newCard = {
        id: generateUniqueId(),
        title,
        text,
        creationDate: formattedDate,
      };

      newColumns[todoColumnIndex].cards.push(newCard);
      setColumns(newColumns);

      localStorage.setItem("columns", JSON.stringify(newColumns));
    }
  };

  const handleDeleteCard = (id, index, columnTitle) => {
    const updatedColumns = columns.map((column) => {
      if (column.title.toLowerCase() === columnTitle.toLowerCase()) {
        const updatedCards = column.cards.filter((card) => card.id !== id);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditCardInfo(null);
  };

  const handleCardClick = (id, title, text, creationDate) => {
    setIsModalOpen(true);
    setEditCardInfo({ id, title, text, creationDate });
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
            onEditCard={handleEditCard}
            onCardClick={handleCardClick}
          />
        ))
      )}

      {isModalOpen && editCardInfo && (
        <CardModal
          onClose={handleCloseModal}
          cardInfo={editCardInfo}
          creationDate={editCardInfo.creationDate}
          onUpdate={(updatedTitle, updatedText) => {
            const updatedColumns = columns.map((column) => {
              const updatedCards = column.cards.map((card) => {
                if (card.id === editCardInfo.id) {
                  return {
                    ...card,
                    title: updatedTitle,
                    text: updatedText,
                  };
                }
                return card;
              });
              return {
                ...column,
                cards: updatedCards,
              };
            });
            setColumns(updatedColumns);
            localStorage.setItem("columns", JSON.stringify(updatedColumns));
          }}
          onDelete={(id) => {
            const updatedColumns = columns.map((column) => ({
              ...column,
              cards: column.cards.filter((card) => card.id !== id),
            }));
            setColumns(updatedColumns);
            localStorage.setItem("columns", JSON.stringify(updatedColumns));
          }}
        />
      )}
      {isModalOpen && !editCardInfo && (
        <TaskModal onClose={handleCloseModal} onAdd={handleCreateTask} />
      )}
    </div>
  );
};

export default Board;
