import "./App.css";

import ColumnCard from "./Components/ColumnCard";
import { Container } from "@mui/material";
import TaskCard from "./Components/TaskCard";

function App() {
  const tasks = [
    {
      id: 1,
      name: "Task 1",
      description: "This is the first task ",
    },
    {
      id: 2,
      name: "Task 2",
      description: "This is the second task",
    },
  ];

  const title = "To-Do";
  return (
    <div className="App">
      <Container>
        <h2>Kanban</h2>
        <strong>Dashboard</strong> {">"} Kanban
        <br />
        <ColumnCard title={title} tasks={tasks}>
          <TaskCard task={tasks} />
        </ColumnCard>
      </Container>
    </div>
  );
}

export default App;
