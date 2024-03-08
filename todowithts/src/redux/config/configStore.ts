import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../modules/todosSlice";
import { initialStateType } from "../../common/types";
export type RootState = {
  todos: initialStateType;
  isUpdating: initialStateType;
};

const store = configureStore({
  reducer: { todos: todosReducer },
});

export default store;
