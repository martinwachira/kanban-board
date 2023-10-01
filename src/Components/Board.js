import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addColumn, moveTask } from "../redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";

import ColumnCard from "./ColumnCard";
import { DragDropContext } from "react-beautiful-dnd";
import classes from "./cardstyles.module.css";

const Board = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.board);
  const [showError, setShowError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    localStorage.setItem("Kanban Board", JSON.stringify(state));
  }, [state]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    dispatch(moveTask({ source, destination, draggableId }));
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    if (Object.keys(state.columns).length >= 5) {
      setShowError(true);
      setOpenDialog(true);
      return;
    }
    // Generate a new unique id
    const newColumnId = `column-${Object.keys(state.columns).length + 1}`;
    dispatch(addColumn({ columnId: newColumnId }));
    console.log("columns", state.columns);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <ColumnCard key={column.id} column={column} tasks={tasks} />;
      })}
      {/* hides the add column button when limit is reached */}
      {!showError && (
        <div className={classes.btn}>
          <Card>
            <Button onClick={handleAddColumn} variant="contained">
              Add Column
            </Button>
          </Card>
        </div>
      )}
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
    </DragDropContext>
  );
};

export default Board;
