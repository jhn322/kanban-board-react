import { useState } from "react";
// Icons
import { BsPlusSquareFill } from "react-icons/bs"; // Importing plus square icon
// Components
import Card from "./Card";

// Functional component Column with props destructuring
const Column = ({
  theme,
  className, // Additional class for styling
  title,
  cards = [], // Cards in the column (default empty array)
  isToDo,
  onAddTask,
  onDeleteCard,
  onEditCard,
  onCardClick,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
}) => {
  const [isHovered, setIsHovered] = useState(false); // State for mouse hover state
  const [isClicked, setIsClicked] = useState(false); // State for click state

  // Function to handle card deletion
  const handleDeleteCard = (id, index) => {
    onDeleteCard(id, index, title); // Call onDeleteCard function with card details
  };

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Function to handle click on new task icon
  const handleNewTaskClick = () => {
    onAddTask();
    setIsClicked(true); // Set isClicked state to true
    setTimeout(() => setIsClicked(false), 300); // Reset isClicked state after a delay
  };

  return (
    <div
      className={`column ${className}`} // CSS class for column with additional class
      onDragOver={(event) => onDragOver(event)} // Handle drag over event
      onDrop={(e) => onDrop(e, title)} // Handle drop event
    >
      <div className="column-title">
        <h2>{title}</h2>
      </div>
      <div className="card-list">
        {" "}
        {/* Container for card list */}
        {cards.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            draggable // Make card draggable
            onDragStart={(e) => onDragStart(e, card)}
            onDragEnter={(e) => onDragEnter(e, title)}
            onClick={() =>
              onCardClick(card.id, card.title, card.text, card.creationDate)
            }
          >
            <Card // Render Card component
              theme={theme}
              id={card.id}
              index={index}
              title={card.title}
              text={card.text}
              creationDate={card.creationDate}
              onDelete={handleDeleteCard}
              columnTitle={title}
              onEdit={onEditCard} // Function to edit the card
            />
          </div>
        ))}
      </div>
      {isToDo && ( // Render new task icon only if column is "To Do"
        <div
          className="new-task-icon"
          onClick={handleNewTaskClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            animation: isClicked ? "spin 0.5s linear" : "none", // Apply animation if clicked
          }}
        >
          <BsPlusSquareFill // Plus square icon for adding new task
            style={{
              fill: isHovered ? "url(#gradient)" : "#ffffff",
              cursor: "pointer",
              transition: "fill 0.3s ease",
            }}
          />
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              {" "}
              {/* Definitions for SVG gradient */}
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#783db2" />
                <stop offset="50%" stopColor="#f2379a" />
                <stop offset="100%" stopColor="#fd8173" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Column;
