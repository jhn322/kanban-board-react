import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setShowBurgerMenu(false);
        setIsMenuOpen(false);
      } else {
        setShowBurgerMenu(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`nav-container ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="nav">
        <div>
          <h1 className={`headline ${isMenuOpen ? "hidden" : ""}`}>
            <span className="gradient">KANBAN</span> BOARD
          </h1>
        </div>
        {showBurgerMenu && (
          <button
            className="burger-menu"
            onClick={toggleMenu}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "block",
              position: "absolute",
              top: "7px",
              left: "5px",
              transition: "transform 2s",
            }}
          >
            {isMenuOpen ? (
              <MdClose
                style={{
                  fontSize: "32px",
                  color: "#000000",
                }}
              />
            ) : (
              <MdMenu
                style={{
                  fontSize: "32px",
                  color: "#fff",
                }}
              />
            )}
          </button>
        )}
        <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/todo" className="nav-link">
                To Do
              </NavLink>
            </li>
            <li>
              <NavLink to="/doing" className="nav-link">
                Doing
              </NavLink>
            </li>
            <li>
              <NavLink to="/done" className="nav-link">
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
