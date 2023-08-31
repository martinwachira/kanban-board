import { Card, CardContent, CardHeader, IconButton } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import TaskCard from "./TaskCard";
import classes from "./cardstyles.module.css";

const ColumnCard = ({ title, tasks }) => {
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
        {/* <TaskCard /> */}
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </CardContent>
      <hr />
      <CardContent className={classes.faction}>Button</CardContent>
    </Card>
  );
};

export default ColumnCard;
