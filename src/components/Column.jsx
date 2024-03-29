import React from "react";
import Card from "./Card";

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
        <div className="add-task-button">
          <button onClick={onAddTask}>Add New Task</button>
        </div>
      )}
    </div>
  );
};

export default Column;
