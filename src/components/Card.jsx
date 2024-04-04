import React from "react";
// Icons
import { FaTrash } from "react-icons/fa";

// Component with props destructing
const Card = ({
  id,
  index,
  title,
  text,
  creationDate,
  onDelete, // Function to handle card deletion
  columnTitle,
  onCardClick,
}) => {
  // Function to handle deletion of the card
  const handleDelete = (event) => {
    event.stopPropagation(); // Preventing event bubbling
    onDelete(id, index, columnTitle); // Call onDelete function with card details
  };

  // Function to handle card click
  const handleCardClick = () => {
    onCardClick(id, title, text, creationDate); // Call onCardClick function with card details
  };

  return (
    <div
      className="card"
      onClick={handleCardClick} // Handle click event on the card
      style={{ cursor: "pointer" }}
    >
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
      <div className="card-date-container">
        <p className="card-date">{creationDate}</p>
      </div>
      <div className="card-actions">
        <FaTrash // Trash icon for deleting the card
          className="trash-icon"
          onClick={handleDelete} // Handle click event for deleting the card
          style={{
            fill: "url(#gradient)", // Filling with gradient
            cursor: "pointer",
            transition: "fill 0.3s ease",
          }}
        />
      </div>
      {/* SVG for gradient */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#783db2" />
            <stop offset="50%" stopColor="#f2379a" />
            <stop offset="100%" stopColor="#fd8173" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Card;
