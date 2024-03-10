import axios from "axios";
import { Todo } from "@src/common/types";
const SERVER_URI = "http://localhost:4000";
// 모든 todos를 가져오는 api
const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${SERVER_URI}/todos`);
  return response.data;
};
const addTodo = async (newTodo: Todo) => {
  await axios.post(`${SERVER_URI}/todos`, newTodo);
};
const deleteTodo = async (id: string) => {
  await axios.delete(`${SERVER_URI}/todos/${id}`);
};
const toggleTodo = async ({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}) => {
  await axios.patch(`${SERVER_URI}/todos/${id}`, {
    isCompleted: !isCompleted,
  });
};

export { getTodos, addTodo, deleteTodo, toggleTodo };
