import React from "react";
import Board from "./components/Board";
// import Card from "./components/Card";
// import Column from "./components/Column";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Board />
    </div>
  );
}

export default App;
