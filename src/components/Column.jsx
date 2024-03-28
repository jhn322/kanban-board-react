import React from "react";
import Card from "./Card";

const Column = ({ title, cards = [] }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="card-list">
        {cards.map((card, index) => (
          <Card key={index} text={card.text} />
        ))}
      </div>
    </div>
  );
};

export default Column;
