import { Card, CardContent } from "@mui/material";
// import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";

const TaskCard = ({ task }) => {
  const id = task?.id;
  const name = task?.name;
  const description = task?.description;

  // const [item, setIsDragging] = useState(false);
  const [items, setTasks] = useState([task]);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(task));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updatedTasks = items.filter((task) => id !== droppedTask.id);
    setTasks([...updatedTasks, droppedTask]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    // <Droppable droppableId={id.toString()}>
    //   {(provided) => (
    //     <Draggable
    //       draggableId={id.toString()}
    //       index={id}
    //       isDragging={isDragging}
    //       onDragStart={() => setIsDragging(true)}
    //       onDragEnd={() => setIsDragging(false)}
    //       {...provided.droppableProps}
    //       ref={provided.innerRef}
    //     >
    //       {(props) => (
    <Card
      key={id}
      style={{ marginBottom: "15px" }}
      onDragStart={(e) => handleDragStart(e, task)}
      draggable
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <CardContent>
        <h4>{name}</h4>
        <p>{description}</p>
      </CardContent>
    </Card>
    // )}
    //       </Draggable>
    //     )}
    //   </Droppable>
  );
};

export default TaskCard;
