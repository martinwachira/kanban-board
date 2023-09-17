import React, { useState } from "react";

import ColumnCard from "./ColumnCard";
import { DragDropContext } from "react-beautiful-dnd";

const Board = () => {
  // Initial state
  const [state, setState] = useState({
    tasks: {
      "task-1": { id: "task-1", content: "Task 1" },
      "task-2": { id: "task-2", content: "Task 2" },
      "task-3": { id: "task-3", content: "Task 3" },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Todo",
        taskIds: ["task-2", "task-3"],
      },
      "column-2": {
        id: "column-2",
        title: "In-progress",
        taskIds: ["task-1"],
      },
    },
    columnOrder: ["column-1", "column-2"],
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination (i.e., the user cancelled the drag), then do nothing
    if (!destination) {
      return;
    }

    // If the source and destination are the same, then do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Start by making a copy of the column using the source's droppableId
    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    // Then remove the task from the source column's taskIds
    newTaskIds.splice(source.index, 1);

    // And then insert it into the destination column's taskIds
    newTaskIds.splice(destination.index, 0, draggableId);

    // Then create a new column with the updated taskIds
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    // And finally update the state with the new column
    setState((prevState) => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [newColumn.id]: newColumn,
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        console.log("column", column);
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <ColumnCard key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default Board;
