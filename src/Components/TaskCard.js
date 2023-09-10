import { Card, CardContent, TextField } from "@mui/material";

import { Draggable } from "react-beautiful-dnd";
import React from "react";

const TaskCard = ({ task }) => {
  const id = task?.id;
  const name = task?.name;
  // const description = task?.description;

  return (
    <Draggable key={id} draggableId={id.toString()} index={id}>
      {(provided, snapshot) => (
        <Card
          snapshot={snapshot}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={{ marginBottom: "15px", background: "#aedefb" }}
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
