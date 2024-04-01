import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";

const Card = ({ id, index, title, text, creationDate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLongPressing, setIsLongpressing] = useState(false);
  const timerRef = useRef(null);

  const handleDelete = () => {
    onDelete(id, index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle the delete function on mobile devices more intuitively
  const handleTouchStart = () => {
    setIsLongpressing(false);
    timerRef.current = setTimeout(() => {
      setIsLongpressing(true);
      setIsHovered(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(timerRef.current);
    if (!isLongPressing) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
      <div className="card-date-container">
        <p className="card-date">{creationDate}</p>
      </div>
      <FaTrash
        className="trash-icon"
        onClick={handleDelete}
        style={{
          fill: isHovered ? "url(#gradient)" : "#000000",
          cursor: "pointer",
          transition: "fill 0.3s ease",
        }}
      />
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
