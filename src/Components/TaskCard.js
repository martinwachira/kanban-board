import { Card, CardContent } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";

const TaskCard = ({ task }) => {
  const id = task?.id;
  const name = task?.name;
  const description = task?.description;

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Droppable droppableId={id.toString()}>
      {(provided) => (
        <Draggable
          draggableId={id.toString()}
          index={id}
          isDragging={isDragging}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {(props) => (
            <Card style={{ marginBottom: "15px" }}>
              <CardContent>
                <h4>{name}</h4>
                <p>{description}</p>
              </CardContent>
            </Card>
          )}
        </Draggable>
      )}
    </Droppable>
  );
};

export default TaskCard;
