import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

const Card = ({
  id,
  index,
  title,
  text,
  creationDate,
  onDelete,
  columnTitle,
  onEdit,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    onDelete(id, index, columnTitle);
  };

  const handleEdit = () => {
    onEdit(id, title, text);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            fill: isHovered ? "url(#gradient)" : "#000000",
            cursor: "pointer",
            transition: "fill 0.3s ease",
          }}
        />
        <BsPencilSquare
          className="edit-icon"
          onClick={handleEdit}
          style={{
            fill: isHovered ? "url(#gradient)" : "#000000",
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
