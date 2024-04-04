import React from "react";
// Icons
import { FaSun, FaMoon } from "react-icons/fa";
// Context
import { useTheme } from "../context/ThemeContext";

// Functional component ThemeSwitcher
const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme(); // Destructuring toggleTheme function and theme from useTheme hook

  return (
    <button className="toggle-theme" onClick={toggleTheme}>
      {" "}
      {/* Theme switch button */}
      {theme === "light" ? ( // Conditionally render sun or moon icon based on theme
        <FaSun
          style={{ cursor: "pointer", color: "white", fontSize: "24px" }} // Sun icon for default
        />
      ) : (
        <FaMoon
          style={{ cursor: "pointer", color: "black", fontSize: "24px" }} // Moon icon for theme
        />
      )}
    </button>
  );
};

export default ThemeSwitcher;
