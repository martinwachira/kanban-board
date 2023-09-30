import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Popover,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Droppable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskCard from "./TaskCard";
import { addColumn } from "../redux/boardSlice";
import classes from "./cardstyles.module.css";

const ColumnCard = ({ column, tasks }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.board);
  const [title, setTitle] = useState(column.title);
  const [showError, setShowError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  // func to update the title names
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // this func adds new column cards limited to 5 cards and assigns newly created cards new ids
  const handleAddColumn = (e) => {
    e.preventDefault();
    if (Object.keys(state.columns).length >= 5) {
      setShowError(true);
      setOpenDialog(true);
      return;
    }
    // Generate a new unique id
    const newColumnId = `column-${Object.keys(state.columns).length + 1}`;
    dispatch(addColumn({ columnId: newColumnId, title: title }));
    console.log("columns", state.columns);
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
                    <p>Rename</p>
                    <p>Delete</p>
                    <p>Clear</p>
                  </Popover>
                </IconButton>
              }
            />
            <hr />
            {showError && (
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You can't add more columns!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} autoFocus>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            )}

            <CardContent>
              {tasks.map((task, index) => {
                return <TaskCard key={task.id} task={task} index={index} />;
              })}
            </CardContent>
            {provided.placeholder}
            <hr />
            <CardContent style={{ textAlign: "center", colo: "white" }}>
              <Button
                onClick={handleAddColumn}
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
