import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Popover,
} from "@mui/material";
import React, { useState } from "react";

import { Droppable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskCard from "./TaskCard";
import classes from "./cardstyles.module.css";

const ColumnCard = ({ column, tasks }) => {
  const [anchorEl, setAnchorEl] = useState();
  // console.log("tasks in columnCard", tasks);
  // console.log("title", title);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddColumn = () => {
    console.log("Adding a column");
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
              title={column.title}
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
                    <p>Rename</p>
                    <p>Delete</p>
                    <p>Clear</p>
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
                variant="text"
                style={{ color: "white", fontWeight: "bold" }}
                onClick={handleAddColumn}
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
