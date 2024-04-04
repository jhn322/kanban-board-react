import React, { useState, useEffect } from "react";
// Router
import { NavLink } from "react-router-dom";
// Icons
import { MdMenu, MdClose } from "react-icons/md";
// Context
import { useTheme } from "../context/ThemeContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu open/close
  const [showBurgerMenu, setShowBurgerMenu] = useState(true); // State for showing burger menu
  const { theme } = useTheme(); // Destructuring theme from useTheme hook

  // Effect hook for handling window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        // If window width is greater than 800px
        setShowBurgerMenu(false); // Hide burger menu
        setIsMenuOpen(false); // Close menu
      } else {
        // If window width is less than or equal to 800px
        setShowBurgerMenu(true); // Show burger menu
      }
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    handleResize();

    // Cleanup for event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state
  };

  return (
    <div className={`nav-container ${isMenuOpen ? "menu-open" : ""}`}>
      {" "}
      {/* Container for nav */}
      <div className={`nav ${theme === "alternate" ? "theme" : ""}`}>
        {showBurgerMenu && ( // Conditionally render burger menu button
          <button
            className="burger-menu"
            onClick={toggleMenu} // Click event handler for toggling menu
            style={{
              backgroundColor: "transparent", // Transparent background color for mobile
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "block", // Block display
              position: "absolute", // Absolute positioning
              top: "7px",
              left: "5px",
              transition: "transform 2s", // Transition effect
            }}
          >
            {isMenuOpen ? ( // Conditional rendering based on menu state
              <MdClose // Menu close icon
                style={{
                  fontSize: "32px",
                  color: "#000000",
                }}
              />
            ) : (
              <MdMenu // Menu open icon
                style={{
                  fontSize: "32px",
                  color: "#fff",
                }}
              />
            )}
          </button>
        )}
        <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          {" "}
          {/* Navigation links with router */}
          <ul>
            <li>
              <NavLink
                to="/"
                className={`nav-link ${theme === "alternate" ? "theme" : ""}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todo"
                className={`nav-link ${theme === "alternate" ? "theme" : ""}`}
              >
                To Do
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doing"
                className={`nav-link ${theme === "alternate" ? "theme" : ""}`}
              >
                Doing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/done"
                className={`nav-link ${theme === "alternate" ? "theme" : ""}`}
              >
                Done
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
