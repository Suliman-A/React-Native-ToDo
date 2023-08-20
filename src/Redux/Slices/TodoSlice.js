import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todo = [...action.payload];
      // AsyncStorage.setItem("todo", JSON.stringify(state.todo));
    },
    removeTodo: (state, action) => {
      const todoIdToRemove = action.payload;
      state.todo = state.todo.filter((item) => item.id !== todoIdToRemove);
      // AsyncStorage.setItem("todo", JSON.stringify(state.todo));
    },
    setPriority: (state, action) => {
      const { todoId, priority } = action.payload;
      const todo = state.todo.find((item) => item.id === todoId);
      if (todo) {
        todo.priority = priority;
        // AsyncStorage.setItem("todo", JSON.stringify(state.todo));
      }
    },
    completeTodo: (state, action) => {
      const todoIdToComplete = action.payload;
      const todo = state.todo.find((item) => item.id === todoIdToComplete);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        // AsyncStorage.setItem("todo", JSON.stringify(state.todo));
      }
    },
    addComment: (state, action) => {
      const { todoId, comment } = action.payload;
      const todo = state.todo.find((item) => item.id === todoId);
      if (todo) {
        todo.comments.push(comment);
        // AsyncStorage.setItem("todo", JSON.stringify(state.todo));
      }
    },
    updateComment: (state, action) => {
      const { todoId, commentId, newComment } = action.payload;
      const todo = state.todo.find((item) => item.id === todoId);
      if (todo) {
        const comment = todo.comments.find((c) => c.id === commentId);
        if (comment) {
          comment.text = newComment;
          // AsyncStorage.setItem("todo", JSON.stringify(state.todo)); // Convert to JSON string
        }
      }
    },
    removeComment: (state, action) => {
      const { todoId, commentId } = action.payload;
      const todo = state.todo.find((item) => item.id === todoId);
      if (todo) {
        todo.comments = todo.comments.filter((c) => c.id !== commentId);
        // AsyncStorage.setItem("todo", JSON.stringify(state.todo)); // Convert to JSON string
      }
    },
  },
});

export const todoActions = todoSlice.actions;

// Selectors
export const selectTodo = (state) => state.todo.todo;

export default todoSlice.reducer;
