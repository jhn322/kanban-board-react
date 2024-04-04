import { createContext, useContext, useState } from "react";
import "../theme.css"; // Importing CSS file for theme styles

// Creating context for theme
const ThemeContext = createContext();

// Custom hook to access theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // ThemeProvider component to provide theme context
  const [theme, setTheme] = useState("light"); // State for managing theme

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(
      // Set theme based on current theme
      (prevTheme) => (prevTheme === "light" ? "alternate" : "light") // If previous theme is light, switch to alternate theme; otherwise switch to light theme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {" "}
      {/* Providing theme context */}
      {children}
    </ThemeContext.Provider>
  );
};
