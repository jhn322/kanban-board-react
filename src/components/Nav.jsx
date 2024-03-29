import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav">
        <div>
          <h1 className="headline">
            <span className="gradient">KANBAN</span> BOARD
          </h1>
        </div>
        <div className="nav-container">
          {" "}
          <ul className="nav-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/todo">To Do</NavLink>
            </li>
            <li>
              <NavLink to="/doing">Doing</NavLink>
            </li>
            <li>
              <NavLink to="/done">Done</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
