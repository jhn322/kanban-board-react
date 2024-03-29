import React from "react";
import Column from "./Column";
import { useColumns } from "../components/ColumnContext";
import { useLocation } from "react-router-dom";

const Board = () => {
  const { columns } = useColumns();
  const location = useLocation();

  // Extract the page from the URL
  const page = location.pathname.substring(1);

  return (
    <div className="board">
      {columns
        .filter((column) => {
          // Show all columns when no page specified
          if (!page) return true;
          // Extra specific with showing "To Do" column due to weird error
          if (page === "todo") {
            return column.title.toLowerCase() === "to do";
          }
          // Only show the column if it has cards
          if (column.title.toLowerCase() === page) {
            return column.cards.length > 0;
          }
          return false;
        })
        .map((column, index) => (
          <Column key={index} title={column.title} cards={column.cards} />
        ))}
    </div>
  );
};

export default Board;
