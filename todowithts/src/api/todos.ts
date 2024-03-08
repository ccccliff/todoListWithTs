import axios from "axios";

// 모든 todos를 가져오는 api
const getTodos = async () => {
  const response = await axios.get("http://localhost:4000/todos");
  return response;
};

export { getTodos };
