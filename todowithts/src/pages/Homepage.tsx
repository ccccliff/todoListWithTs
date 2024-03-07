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
import { Todo } from "./../common/types.js";
const Homepage = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(loadedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
      const newTodos = {
        id: new Date().getTime(),
        title: title,
        text: text,
        isCompleted: false,
      };
      setTodos([...todos, newTodos]);
      setTitle("");
      setText("");
      localStorage.setItem("todos", "todos");
    }
  };

  const DeleteHandler = (todoId: number) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };
  const StateHandler = (todoId: number) => {
    setIsUpdating(true);
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    setIsUpdating(false);
  };
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
            placeholder="내용을 입력하세요, 10자 미만"
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
          <TodoBox
            todos={todos.filter((todo) => !todo.isCompleted)}
            DeleteHandler={DeleteHandler}
            StateHandler={StateHandler}
            isUpdating={isUpdating}
          />
        </StyledTodoList>
        done{" "}
        <StyledTodoList>
          {" "}
          <TodoBox
            todos={todos.filter((todo) => todo.isCompleted)}
            DeleteHandler={DeleteHandler}
            StateHandler={StateHandler}
            isUpdating={isUpdating}
          />
        </StyledTodoList>
      </StyledTodos>
    </>
  );
};

export default Homepage;
