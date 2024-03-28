// import { NavLink } from "react-router-dom";
import React from "react";

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
            <li>Home</li>
            <li>To Do</li>
            <li>Doing</li>
            <li>Done</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
