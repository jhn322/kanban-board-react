import { createContext, useContext, useState } from "react";

const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    { title: "To Do", cards: [] },
    { title: "Doing", cards: [] },
    { title: "Done", cards: [] },
  ]);

  return (
    <ColumnContext.Provider value={{ columns, setColumns }}>
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumns = () => useContext(ColumnContext);
