import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { ColumnProvider } from "./components/ColumnContext";
import Board from "./components/Board";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <ColumnProvider>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/todo" element={<Board page="todo" />} />
            <Route path="/doing" element={<Board page="doing" />} />
            <Route path="/done" element={<Board page="done" />} />
          </Routes>
        </div>
      </ColumnProvider>
    </Router>
  );
}

export default App;
