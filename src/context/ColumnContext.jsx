import { createContext, useContext, useState } from "react";

// Creating context for column data
const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {
  // ColumnProvider component to provide column context
  const [columns, setColumns] = useState([
    // State for managing column data
    { title: "To Do", cards: [] }, // Initial To Do column with empty array of cards
    { title: "Doing", cards: [] }, // Initial Doing column with empty array of cards
    { title: "Done", cards: [] }, // Initial Done column with empty array of cards
  ]);

  return (
    <ColumnContext.Provider value={{ columns, setColumns }}>
      {" "}
      {/* Providing column context */}
      {children} {/* Rendering child components */}
    </ColumnContext.Provider>
  );
};

export const useColumns = () => useContext(ColumnContext); // Custom hook to access column context
