import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ColumnCard from "./ColumnCard";
import { DragDropContext } from "react-beautiful-dnd";
import { moveTask } from "../redux/boardSlice";

const Board = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.board);

  console.log("state", state);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        // console.log("column", column);
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <ColumnCard key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default Board;
