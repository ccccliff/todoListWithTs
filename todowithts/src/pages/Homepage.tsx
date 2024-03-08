import { Button } from "@mui/material";
import {
  StyledHeader,
  StyledTitle,
  StyledInput,
  StyledInputArea,
  StyledTodos,
  StyledTodoList,
} from "./StyledHome.js";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TodoBox from "@src/components/TodoBox.js";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../redux/modules/todosSlice.js";
import { RootState } from "../redux/config/configStore.js";
import axios from "axios";
const Homepage = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.item);
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
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4000/todos");
    dispatch(data);
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        working
        <StyledTodoList>
          <TodoBox todos={todos.filter((todo) => !todo.isCompleted)} />
        </StyledTodoList>
        done{" "}
        <StyledTodoList>
          {" "}
          <TodoBox todos={todos.filter((todo) => todo.isCompleted)} />
        </StyledTodoList>
      </StyledTodos>
    </>
  );
};

export default Homepage;
