import "./App.css";

import ColumnCard from "./Components/ColumnCard";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container>
        <h2>Kanban</h2>
        <p>
          <strong>Dashboard</strong> {">"} Kanban
        </p>
        <ColumnCard variant="outlined" />
      </Container>
    </div>
  );
}

export default App;
