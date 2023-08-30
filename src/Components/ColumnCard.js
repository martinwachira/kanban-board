import { Card, CardContent, CardHeader, IconButton } from "@mui/material";

import AddCard from "./AddCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import classes from "./cardstyles.module.css";

const ColumnCard = () => {
  return (
    <Card className={classes.cont}>
      <CardHeader
        title="To-Do"
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <hr />
      <CardContent>List of the tasks</CardContent>
      <hr />
      <CardContent className={classes.faction}>
        <AddCard />
      </CardContent>
    </Card>
  );
};

export default ColumnCard;
