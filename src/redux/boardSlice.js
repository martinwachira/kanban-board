import { configureStore, createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
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
  },
  reducers: {
    moveTask: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      const column = state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      state.columns[column.id].taskIds = newTaskIds;
    },
  },
});

export const { moveTask } = boardSlice.actions;

const reducer = boardSlice.reducer;

// Creates a Redux store holding the state of the app.
let store = configureStore({
  reducer: {
    board: reducer,
  },
});

export default store;
