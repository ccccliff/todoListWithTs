import { Button } from "@mui/material";
import {
  StyledHeader,
  StyledTitle,
  StyledInput,
  StyledInputArea,
  StyledTodos,
  StyledTodoList,
} from "./StyledHome.js";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import TodoBox from "@src/components/TodoBox.js";
import { useDispatch } from "react-redux";
import { addTodos } from "../redux/modules/todosSlice.js";
import axios from "axios";
import { useQuery } from "react-query";
import { Todo } from "../common/types.ts";
const fetchTodos = async () => {
  const { data } = await axios.get<Todo[]>("http://localhost:4000/todos");
  return data;
};

const Homepage = () => {
  const { data: todos, isLoading, error } = useQuery("todos", fetchTodos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const onTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const todoHandler = () => {
    if (!title.trim() || !text.trim()) {
      toast.error<string>("제목과 내용 모두 입력하세요");
    } else {
      dispatch(
        addTodos({ id: new Date().getTime(), title, text, isCompleted: false })
      );
      setTitle("");
      setText("");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>문제가 발생했습니다. 데이터를 가져올 수 없습니다.</div>;

  return (
    <>
      <StyledHeader>
        <StyledTitle>TodoList</StyledTitle>
        <StyledInputArea>
          제목:
          <StyledInput
            maxLength={10}
            placeholder="제목을 입력하세요, 10자 미만"
            primary={true}
            value={title}
            onChange={onTitleHandler}
          />
          내용:
          <StyledInput
            maxLength={30}
            placeholder="내용을 입력하세요, 30자 미만"
            primary={false}
            value={text}
            onChange={onTextHandler}
          />
          <Button onClick={todoHandler} variant="contained">
            작성
          </Button>
        </StyledInputArea>
      </StyledHeader>
      <StyledTodos>
        <StyledTodoList title="working">
          {todos ? (
            <TodoBox todos={todos?.filter((todo) => !todo.isCompleted)} />
          ) : null}
        </StyledTodoList>
        <StyledTodoList title="done">
          {" "}
          {todos ? (
            <TodoBox todos={todos?.filter((todo) => todo.isCompleted)} />
          ) : null}
        </StyledTodoList>
      </StyledTodos>
    </>
  );
};

export default Homepage;
