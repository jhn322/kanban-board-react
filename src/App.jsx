import React from "react";
import Board from "./components/Board";
import Nav from "./components/Nav";
import { ColumnProvider } from "./components/ColumnContext";
import { ThemeProvider } from "./components/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
