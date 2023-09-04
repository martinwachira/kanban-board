import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
// import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskCard from "./TaskCard";
import classes from "./cardstyles.module.css";

const ColumnCard = ({ title, tasks }) => {
  // const [isDragging, setIsDragging] = useState(false);
  const [items, setTasks] = useState(tasks);
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updatedTasks = items.filter((task) => task.id !== droppedTask.id);
    setTasks([...updatedTasks, droppedTask]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Card
      className={classes.cont}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <CardHeader
        title={title}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <hr />
      <CardContent>
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </CardContent>
      <hr />
      <CardContent>Button</CardContent>
    </Card>
  );
};

export default ColumnCard;
