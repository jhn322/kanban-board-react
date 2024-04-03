import { createContext, useContext, useState } from "react";
import "../theme.css";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(
      (prevTheme) => (prevTheme === "light" ? "alternate" : "light") // Changed "default" to "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
