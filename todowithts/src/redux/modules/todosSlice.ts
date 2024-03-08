import { createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "@src/common/types";

const initialState: initialStateType = {
  item: [],
  isUpdating: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.item.push(action.payload);
    },
    deleteTodos: (state, action) => {
      state.item = state.item.filter((todos) => todos.id !== action.payload);
    },
    stateTodos: (state, action) => {
      state.item = state.item.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
  },
});

export const { addTodos, deleteTodos, stateTodos, setIsUpdating } =
  todosSlice.actions;

export default todosSlice.reducer;
