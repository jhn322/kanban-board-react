import { createContext, useContext, useState } from "react";

const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {
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
    <ColumnContext.Provider value={{ columns, setColumns }}>
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumns = () => useContext(ColumnContext);
