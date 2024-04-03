import React, { useState, useEffect } from "react";
import { useColumns } from "../context/ColumnContext";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Column from "./Column";
import TaskModal from "./TaskModal";
import CardModal from "./CardModal";
import ThemeSwitcher from "./ThemeSwitcher";

const Board = () => {
  const { toggleTheme, theme } = useTheme();
  const { columns, setColumns } = useColumns();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCardInfo, setEditCardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem("columns"));
    if (savedColumns) {
      setColumns(savedColumns);
    }
    setIsLoading(false);
  }, [setColumns]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragEnter = (e, targetColumn) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const updatedColumns = columns.map((column) => {
      let updatedCards;
      if (column.title.toLowerCase() === targetColumn.toLowerCase()) {
        updatedCards = column.cards.concat(draggedItem);
      } else {
        updatedCards = column.cards.filter(
          (card) => card.id !== draggedItem.id
        );
      }
      return {
        ...column,
        cards: updatedCards,
      };
    });
    setColumns(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
  };

  const handleEditCard = (id, title, text) => {
    setIsModalOpen(true);
    setEditCardInfo({ id, title, text });
  };

  const handleCreateTask = ({ title, text }) => {
    const newColumns = columns.map((column) => {
      if (column.title.toLowerCase() === "to do") {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}/${
          currentDate.getMonth() + 1
        }/${currentDate.getDate()}`;

        const generateUniqueId = () => {
          return "_" + Math.random().toString(36).substring(2, 9);
        };

        const newCard = {
          id: generateUniqueId(),
          title,
          text,
          creationDate: formattedDate,
        };

        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });

    setColumns(newColumns);
    localStorage.setItem("columns", JSON.stringify(newColumns));
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
  let filteredColumns;

  if (page === "") {
    filteredColumns = columns;
  } else {
    filteredColumns = columns.filter(
      (column) =>
        column.title.toLowerCase() === page.toLowerCase() ||
        column.title.toLowerCase().replace(" ", "") === page.toLowerCase()
    );
  }

  return (
    <div className={`board ${theme}`}>
      <ThemeSwitcher />
      {filteredColumns.map((column, index) => (
        <Column
          key={column.title}
          title={column.title}
          cards={column.cards}
          isToDo={column.title.toLowerCase() === "to do"}
          onAddTask={handleAddTask}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          onCardClick={handleCardClick}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          draggedItem={draggedItem}
          className={theme === "alternate" ? "theme" : ""}
        />
      ))}
      {isModalOpen && editCardInfo && (
        <CardModal
          theme={theme}
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
        <TaskModal
          theme={theme}
          onClose={handleCloseModal}
          onAdd={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Board;
