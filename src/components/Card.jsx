import React from "react";

const Card = ({ title, text }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Card;
