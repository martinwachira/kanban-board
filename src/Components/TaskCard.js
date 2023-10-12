import { Button, Card, CardContent, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { addTask, deleteTask, updateTaskContent } from "../redux/boardSlice";

import { Draggable } from "react-beautiful-dnd";
import classes from "./cardstyles.module.css";
import { useDispatch } from "react-redux";

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();
  const [isTaskAdded, setIsTaskAdded] = useState(false);

  const id = task?.id;
  const name = task?.content;
  const [taskName, setTaskName] = useState(name);

  const handleAddTask = () => {
    console.log("adding a task");
    const newTaskId = "task-" + Date.now(); //generate a unique id for the task
    dispatch(addTask({ taskId: newTaskId, content: taskName }));
    setIsTaskAdded(true);
  };

  const handleDeleteTask = () => {
    console.log("deleting task");
    dispatch(deleteTask(id));
  };

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
            {isTaskAdded ? (
              <Paper style={{ padding: "1.5rem" }}>{taskName}</Paper>
            ) : (
              <TextField
                // label="Task"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  dispatch(
                    updateTaskContent({
                      taskId: id,
                      newContent: e.target.value,
                    })
                  );
                }}
                fullWidth
              />
            )}
            <br />
            <br />
            {!isTaskAdded && (
              <div>
                <Button
                  variant="standard"
                  style={{ fontSize: ".5rem" }}
                  onClick={handleDeleteTask}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{ float: "right", fontSize: ".5rem" }}
                  onClick={handleAddTask}
                >
                  Add
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
