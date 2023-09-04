import "./App.css";

import React, { useState } from "react";

import ColumnCard from "./Components/ColumnCard";
import { Container } from "@mui/material";
import TaskCard from "./Components/TaskCard";

// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  // const [items, setTasks] = useState(tasks);

  const title = "To-Do";
  const title1 = "In-Progress";

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const droppedTask = JSON.parse(e.dataTransfer.getData("text/plain"));
  //   const updatedTasks = items.filter((task) => task.id !== droppedTask.id);
  //   setTasks([...updatedTasks, droppedTask]);
  // };
  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  return (
    // <DragDropContext droppableId="to-do">
    <div className="App">
      <Container>
        <h2>Kanban</h2>
        <strong>Dashboard</strong> {">"} Kanban
        <br />
        {/* <Droppable droppableId="to-do"> */}
        {/* {(provided) => ( */}
        <ColumnCard
          title={title}
          tasks={tasks}
          // onDrop={handleDrop}
          // onDragOver={handleDragOver}
        >
          {tasks.map((task) => (
            // <Draggable
            //   draggableId={task.id.toString()}
            //   key={task.id}
            //   task={task}
            //   // {...provided.droppableProps}
            // >
            // </Draggable>
            <TaskCard key={task.id} task={task} />
          ))}
        </ColumnCard>
        <ColumnCard
          title={title1}
          tasks={tasks}
          // onDrop={handleDrop}
          // onDragOver={handleDragOver}
        >
          {tasks.map((task) => (
            // <Draggable
            //   draggableId={task.id.toString()}
            //   key={task.id}
            //   task={task}
            //   // {...provided.droppableProps}
            // >
            // </Draggable>
            <TaskCard key={task.id} task={task} />
          ))}
        </ColumnCard>
        {/* )} */}
        {/* </Droppable> */}
      </Container>
    </div>
    // </DragDropContext>
  );
}

export default App;
