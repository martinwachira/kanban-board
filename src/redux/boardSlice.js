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
        taskIds: ["task-1", "task-3"],
      },
    },
    columnOrder: ["column-1"],
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
    addTaskCard: (state, action) => {
      const { taskId, content, columnId } = action.payload;
      state.tasks[taskId] = { id: taskId, content: content };
      state.columns[columnId].taskIds.push(taskId);
    },
    updateTaskContent: (state, action) => {
      const { taskId, newContent } = action.payload;
      state.tasks[taskId].content = newContent;
    },
    addColumn: (state, action) => {
      const { columnId, title } = action.payload;
      state.columns[columnId] = { id: columnId, title, taskIds: [] };
      state.columnOrder.push(columnId);
    },
    renameColumn: (state, action) => {
      const { columnId, newTitle } = action.payload;
      state.columns[columnId].title = newTitle;
    },
    deleteColumn: (state, action) => {
      const columnId = action.payload;
      delete state.columns[columnId];
      state.columnOrder = state.columnOrder.filter((id) => id !== columnId);
    },
    clearColumn: (state, action) => {
      const columnId = action.payload;
      state.columns[columnId].taskIds = [];
    },
  },
});

export const {
  addTaskCard,
  updateTaskContent,
  moveTask,
  addColumn,
  renameColumn,
  deleteColumn,
  clearColumn,
} = boardSlice.actions;

const reducer = boardSlice.reducer;

// Creates a Redux store holding the state of the app.
let store = configureStore({
  reducer: {
    board: reducer,
  },
});

export default store;
