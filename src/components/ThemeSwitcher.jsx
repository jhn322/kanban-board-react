import React from "react";
import { useTheme } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button className="toggle-theme" onClick={toggleTheme}>
      {theme === "light" ? (
        <FaSun
          style={{ cursor: "pointer", color: "white", fontSize: "24px" }}
        />
      ) : (
        <FaMoon
          style={{ cursor: "pointer", color: "black", fontSize: "24px" }}
        />
      )}
    </button>
  );
};

export default ThemeSwitcher;
