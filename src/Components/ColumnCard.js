import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  addTask,
  clearColumn,
  deleteColumn,
  renameColumn,
} from "../redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";

import { Droppable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskCard from "./TaskCard";
import classes from "./cardstyles.module.css";

const ColumnCard = ({ column, tasks }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.board);
  const [title, setTitle] = useState(column.title);
  const [anchorEl, setAnchorEl] = useState();

  // func to update the column title name
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAddTask = (content, columnId) => {
    // Generate a unique taskId based on the current number of tasks
    const taskId = `task-${Object.keys(state.tasks).length + 1}`;
    console.log("tasks", taskId, "column", column.id);
    dispatch(
      addTask({
        taskId: taskId,
        content: content,
        columnId: column.id,
      })
    );
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRename = () => {
    dispatch(renameColumn({ columnId: column.id, newTitle: title }));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteColumn(column.id));
    handleClose();
  };
  const handleClear = () => {
    dispatch(clearColumn(column.id));
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "column-actions" : undefined;
  return (
    <Box sm={{ margin: 1, minWidth: 275 }}>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Card
            className={classes.cont}
            snapshot={snapshot}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ background: "#019ebb" }}
          >
            <CardHeader
              title={<TextField value={title} onChange={handleTitleChange} />}
              action={
                <IconButton onClick={handleClick}>
                  <MoreVertIcon />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Paper style={{ padding: "1.5rem" }}>
                      <p onClick={handleRename}>Rename</p>
                      <p onClick={handleDelete}>Delete</p>
                      <p onClick={handleClear}>Clear</p>
                    </Paper>
                  </Popover>
                </IconButton>
              }
            />
            <hr />

            <CardContent>
              {tasks.map((task, index) => {
                return <TaskCard key={task.id} task={task} index={index} />;
              })}
            </CardContent>
            {provided.placeholder}
            <hr />
            <CardContent style={{ textAlign: "center", colo: "white" }}>
              <Button
                onClick={handleAddTask}
                disabled={Object.keys(state.columns).length > 5}
                variant="text"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Add Card
              </Button>
            </CardContent>
          </Card>
        )}
      </Droppable>
    </Box>
  );
};

export default ColumnCard;
