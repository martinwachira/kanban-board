import { Button, Card, CardContent, TextField } from "@mui/material";
import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import classes from "./cardstyles.module.css";
import { updateTaskContent } from "../redux/boardSlice";
import { useDispatch } from "react-redux";

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();
  const id = task?.id;
  const name = task?.content;
  const [taskName, setTaskName] = useState(name);

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
            <TextField
              label="Task"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                dispatch(
                  updateTaskContent({ taskId: id, newContent: e.target.value })
                );
              }}
              fullWidth
            />
            <br />
            <br />
            <Button variant="standard">Cancel</Button>
            <Button variant="contained" style={{ float: "right" }}>
              Add
            </Button>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
