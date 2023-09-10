import ColumnCard from "./ColumnCard";
import { Container } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import React from "react";
import TaskCard from "./TaskCard";

const Board = () => {
  const tasks = [
    {
      id: 1,
      name: "This is the first task",
      description: "This is the first task ",
    },
    {
      id: 2,
      name: "This is the second task",
      description: "This is the second task",
    },
  ];

  const title1 = "To-Do";
  const title2 = "In-Progress";

  function handledragEnd(result) {
    console.log("Drag End");
  }
  return (
    <DragDropContext onDragEnd={handledragEnd}>
      <Container>
        <h2>Kanban</h2>
        <strong>Dashboard</strong> {">"} Kanban
        <br />
        <ColumnCard title={title1} tasks={tasks}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ColumnCard>
        <ColumnCard title={title2} tasks={tasks}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ColumnCard>
      </Container>
    </DragDropContext>
  );
};
export default Board;
