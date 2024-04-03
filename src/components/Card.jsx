import React from "react";
import { FaTrash } from "react-icons/fa";

const Card = ({
  theme,
  id,
  index,
  title,
  text,
  creationDate,
  onDelete,
  columnTitle,
  onCardClick,
}) => {
  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(id, index, columnTitle);
  };

  const handleCardClick = () => {
    onCardClick(id, title, text, creationDate);
  };

  return (
    <div
      className="card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
      <div className="card-date-container">
        <p className="card-date">{creationDate}</p>
      </div>
      <div className="card-actions">
        <FaTrash
          className="trash-icon"
          onClick={handleDelete}
          style={{
            fill: "url(#gradient)",
            cursor: "pointer",
            transition: "fill 0.3s ease",
          }}
        />
      </div>
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
