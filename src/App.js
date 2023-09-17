import "./App.css";

import Board from "./Components/Board";
import React from "react";

function App() {
  return (
    <>
      <div style={{ margin: "2rem 4rem" }}>
        <h2>Kanban</h2>
        <strong>Dashboard</strong> {">"} Kanban
        <br />
      </div>
      <div className="App">
        <Board />
      </div>
    </>
  );
}

export default App;
