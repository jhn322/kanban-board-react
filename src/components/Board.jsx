import React, { useState } from "react";
import Column from "./Column";

const Board = () => {
  const [columns, setColumns] = useState([
    {
      title: "To Do",
      cards: [{ text: "Task 1" }, { text: "Task 2" }, { text: "Task 3" }],
    },
    {
      title: "Doing",
      cards: [{ text: "Task 4" }, { text: "Task 5" }],
    },
    {
      title: "Done",
      cards: [{ text: "Task 6" }],
    },
  ]);

  return (
    <div className="board">
      {columns.map((column, index) => (
        <Column key={index} title={column.title} cards={column.cards} />
      ))}
    </div>
  );
};

export default Board;
