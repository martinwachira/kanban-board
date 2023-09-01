import "./App.css";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  const title1 = "In-Progress";
  return (
    <DragDropContext droppableId="to-do">
      <div className="App">
        <Container>
          <h2>Kanban</h2>
          <strong>Dashboard</strong> {">"} Kanban
          <br />
          <Droppable droppableId="to-do">
            {(provided) => (
              <ColumnCard title={title} tasks={tasks}>
                {tasks.map((task) => (
                  <Draggable
                    draggableId={task.id.toString()}
                    key={task.id}
                    task={task}
                    {...provided.droppableProps}
                  >
                    <TaskCard task={task} />
                  </Draggable>
                ))}
              </ColumnCard>
            )}
          </Droppable>
          <Droppable droppableId="in-progress">
            {(provided) => (
              <ColumnCard title={title1} tasks={tasks}>
                {tasks.map((task) => (
                  <Draggable
                    draggableId={task.id.toString()}
                    key={task.id}
                    task={task}
                    {...provided.droppableProps}
                  >
                    <TaskCard task={task} />
                  </Draggable>
                ))}
              </ColumnCard>
            )}
          </Droppable>
        </Container>
      </div>
    </DragDropContext>
  );
}

export default App;
