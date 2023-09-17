import { Card, CardContent, TextField } from "@mui/material";

import { Draggable } from "react-beautiful-dnd";
import React from "react";
import classes from "./cardstyles.module.css";

const TaskCard = ({ task, index }) => {
  const id = task?.id;
  const name = task?.content;

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <Card
          className={classes.task_card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sm={{ margin: 1 }}
        >
          <CardContent>
            <TextField value={name} fullWidth />
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
