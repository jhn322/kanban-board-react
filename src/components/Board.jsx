import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Context
import { useTheme } from "../context/ThemeContext";
import { useColumns } from "../context/ColumnContext";
// Components
import Column from "./Column";
import TaskModal from "./TaskModal";
import CardModal from "./CardModal";
import ThemeSwitcher from "./ThemeSwitcher";

const Board = () => {
  const { toggleTheme, theme } = useTheme(); // Extracting theme and theme toggle function from theme context
  const { columns, setColumns } = useColumns(); // Extracting columns and function for updating columns from columns context
  const location = useLocation(); // Getting current URL location
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal open/close
  const [editCardInfo, setEditCardInfo] = useState(null); // State for managing card edit information
  const [isLoading, setIsLoading] = useState(true); // State for managing loading state
  const [draggedItem, setDraggedItem] = useState(null); // State for managing dragged item during drag and drop operation

  // Effect hook to load saved columns from local storage
  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem("columns"));
    if (savedColumns) {
      setColumns(savedColumns); // Update columns context with saved columns
    }
    setIsLoading(false);
  }, [setColumns]); // Dependency array ensures this effect runs only when setColumns function changes

  // Function to handle drag start event
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  // Function to handle drag enter event
  const handleDragEnter = (e, targetColumn) => {
    e.preventDefault();
  };

  // Function to handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const updatedColumns = columns.map((column) => {
      let updatedCards;
      if (column.title.toLowerCase() === targetColumn.toLowerCase()) {
        updatedCards = column.cards.concat(draggedItem); // Add dragged item to target column
      } else {
        updatedCards = column.cards.filter(
          (card) => card.id !== draggedItem.id // Remove dragged item from other columns
        );
      }
      return {
        ...column,
        cards: updatedCards,
      };
    });
    setColumns(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns)); // Update local storage with updated columns
  };

  // Function to handle editing a card
  const handleEditCard = (id, title, text) => {
    setIsModalOpen(true);
    setEditCardInfo({ id, title, text }); // Set information of the card to be edited
  };

  // Function to create a new task
  const handleCreateTask = ({ title, text }) => {
    const newColumns = columns.map((column) => {
      if (column.title.toLowerCase() === "to do") {
        // If the column is "To Do"
        const currentDate = new Date(); // Get current date
        const formattedDate = `${currentDate.getFullYear()}/${
          currentDate.getMonth() + 1
        }/${currentDate.getDate()}`;

        // Function to generate unique ID for new card
        const generateUniqueId = () => {
          return "_" + Math.random().toString(36).substring(2, 9);
        };

        // Generate unique ID for the card
        const newCard = {
          id: generateUniqueId(),
          title,
          text,
          creationDate: formattedDate, // Set creation date
        };

        return {
          ...column,
          cards: [...column.cards, newCard], // Add new card to "To Do" column
        };
      }
      return column;
    });

    setColumns(newColumns); // Update columns context with new columns
    localStorage.setItem("columns", JSON.stringify(newColumns));
  };

  // Function to handle deletion of a card
  const handleDeleteCard = (id, index, columnTitle) => {
    const updatedColumns = columns.map((column) => {
      if (column.title.toLowerCase() === columnTitle.toLowerCase()) {
        const updatedCards = column.cards.filter((card) => card.id !== id); // Remove the card with specified ID
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

  // Function to handle adding a task
  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditCardInfo(null); // Reset edit card information
  };

  // Function to handle clicking on a card
  const handleCardClick = (id, title, text, creationDate) => {
    setIsModalOpen(true);
    setEditCardInfo({ id, title, text, creationDate }); // Set information of the clicked card
  };

  // Extract page from URL
  const page = location.pathname.substring(1);
  let filteredColumns;

  if (page === "") {
    filteredColumns = columns; // If page is empty, show all columns
  } else {
    filteredColumns = columns.filter(
      (column) =>
        column.title.toLowerCase() === page.toLowerCase() ||
        column.title.toLowerCase().replace(" ", "") === page.toLowerCase() // Filter columns based on page
    );
  }

  return (
    // Render the board with dynamic theme class
    <div className={`board ${theme}`}>
      <ThemeSwitcher /> {/* Render theme switcher component */}
      {filteredColumns.map((column, index) => (
        <Column
          key={column.title} // Unique key for column
          title={column.title}
          cards={column.cards}
          isToDo={column.title.toLowerCase() === "to do"} // Flag indicating if column is "To Do"
          onAddTask={handleAddTask}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          onCardClick={handleCardClick}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          draggedItem={draggedItem}
          className={theme === "alternate" ? "theme" : ""} // Dynamic class based on theme
        />
      ))}
      {isModalOpen && editCardInfo && (
        <CardModal
          theme={theme} // Theme for card modal
          onClose={handleCloseModal}
          cardInfo={editCardInfo}
          creationDate={editCardInfo.creationDate}
          onUpdate={(updatedTitle, updatedText) => {
            const updatedColumns = columns.map((column) => {
              const updatedCards = column.cards.map((card) => {
                // If card ID matches, update card
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
              cards: column.cards.filter((card) => card.id !== id), // Remove card with specified ID
            }));
            setColumns(updatedColumns);
            localStorage.setItem("columns", JSON.stringify(updatedColumns)); // Update local storage with updated columns
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
