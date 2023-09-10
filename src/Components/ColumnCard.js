import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";

import { Droppable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import TaskCard from "./TaskCard";
import classes from "./cardstyles.module.css";

const ColumnCard = ({ title, tasks }) => {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <Card
          className={classes.cont}
          snapshot={snapshot}
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ background: "#019ebb" }}
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
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} index={task.id} />
            ))}
          </CardContent>
          {provided.placeholder}
          <hr />
          <CardContent style={{ textAlign: "center", colo: "white" }}>
            <Button
              variant="text"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Add Card
            </Button>
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
};

export default ColumnCard;
