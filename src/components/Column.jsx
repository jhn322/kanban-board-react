import React from "react";
import Card from "./Card";
import { BsPlusSquareFill } from "react-icons/bs";

const Column = ({ title, cards = [], isToDo, onAddTask }) => {
  return (
    <div className="column">
      <div className="column-title">
        <h2>{title}</h2>
      </div>
      <div className="card-list">
        {cards.map((card, index) => (
          <Card key={index} text={card.text} />
        ))}
      </div>
      {isToDo && (
        <div className="new-task-button">
          <button onClick={onAddTask}>
            New task <BsPlusSquareFill />
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;
