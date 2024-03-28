import React from "react";
import Board from "./components/Board";
import Card from "./components/Card";
import Column from "./components/Column";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>KANBAN BOARD</h1>
      <Board />
    </div>
  );
}

export default App;
