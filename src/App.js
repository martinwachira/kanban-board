import "./App.css";

import Board from "./Components/Board";
import { Provider } from "react-redux";
import React from "react";
import store from "./redux/boardSlice";

function App() {
  return (
    <Provider store={store}>
      <div style={{ margin: "2rem 4rem" }}>
        <h2>Kanban</h2>
        <strong>Dashboard</strong> {">"} Kanban
        <br />
      </div>
      <div className="App">
        <Board />
      </div>
    </Provider>
  );
}

export default App;
