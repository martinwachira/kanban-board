import { configureStore, createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Todo",
        taskIds: [],
      },
    },
    columnOrder: ["column-1"],
  },

  reducers: {
    addTask: (state, action) => {
      const { taskId, content } = action.payload;
      state.tasks[taskId] = { id: taskId, content: content };
    },

    moveTask: (state, action) => {
      const { source, destination, draggableId } = action.payload;

      // Remove task from source column
      const start = state.columns[source.droppableId];
      const newStartTaskIds = Array.from(start.taskIds);
      newStartTaskIds.splice(source.index, 1);
      start.taskIds = newStartTaskIds;

      // Add task to destination column
      const finish = state.columns[destination.droppableId];
      const newFinishTaskIds = Array.from(finish.taskIds);
      newFinishTaskIds.splice(destination.index, 0, draggableId);
      finish.taskIds = newFinishTaskIds;
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;
      const { [taskId]: deletedTask, ...remainingTasks } = state.tasks;
      state.tasks = remainingTasks;
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
      console.log("Clearing column: ", columnId);

      // If the column exists, clear its name
      if (state.columns[columnId]) {
        state.columns = {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            title: "",
          },
        };
      }
    },
  },
});

export const {
  addTaskCard,
  updateTaskContent,
  addTask,
  moveTask,
  deleteTask,
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
