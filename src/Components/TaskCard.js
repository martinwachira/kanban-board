import { Card, CardContent } from "@mui/material";

import React from "react";

const TaskCard = ({ task }) => {
  const name = task?.name;
  const description = task?.description;

  console.log("tasks", task);

  return (
    <Card style={{ marginBottom: "15px" }}>
      <CardContent>
        <h4>{name}</h4>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
