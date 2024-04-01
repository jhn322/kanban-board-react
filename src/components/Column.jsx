import { useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import Card from "./Card";

const Column = ({ title, cards = [], isToDo, onAddTask, onDeleteCard }) => {
  const [columnCards, setColumnCards] = useState(cards);
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteCard = (id, index) => {
    const updatedCards = [...columnCards];
    updatedCards.splice(index, 1);
    setColumnCards(updatedCards);
    onDeleteCard(id, index, title);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="column">
      <div className="column-title">
        <h2>{title}</h2>
      </div>
      <div className="card-list">
        {columnCards.map((card, index) => (
          <Card
            key={`${card.id}-${index}`}
            id={card.id}
            index={index}
            title={card.title}
            text={card.text}
            creationDate={card.creationDate}
            onDelete={handleDeleteCard}
            columnTitle={title}
          />
        ))}
      </div>
      {isToDo && (
        <div
          className="new-task-icon"
          onClick={onAddTask}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <BsPlusSquareFill
            style={{
              fill: isHovered ? "url(#gradient)" : "#ffffff",
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
      )}
    </div>
  );
};

export default Column;
