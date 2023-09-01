import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskCard from "./TaskCard";
import classes from "./cardstyles.module.css";

const ColumnCard = ({ title, tasks }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Card className={classes.cont}>
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
            <Droppable
              key={task.id}
              droppableId={task.id.toString()}
              isDragging={isDragging}
              onDragEnter={() => {
                setIsDragging(true);
              }}
              onDragLeave={() => {
                setIsDragging(false);
              }}
              onDrop={(result) => {
                // Do something with the result of the drop event.
                console.log("dropped here", result);
              }}
            >
              {(provided) => (
                <Draggable
                  draggableId={task.id.toString()}
                  index={task.id}
                  isDragging={isDragging}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  {...provided.droppableProps}
                >
                  {(props) => <TaskCard task={task} />}
                </Draggable>
              )}
            </Droppable>
          ))}
        </div>
      </CardContent>
      <hr />
      <CardContent>Button</CardContent>
    </Card>
  );
};

export default ColumnCard;
