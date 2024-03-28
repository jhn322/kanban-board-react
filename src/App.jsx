// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Board from "./components/Board";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Board />
    </div>
  );
}

export default App;
