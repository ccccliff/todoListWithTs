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
import { Todo } from "./../common/types.js";
import { getTodos, addTodo, deleteTodo, toggleTodo } from "@src/api/todos.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Homepage = () => {
  const { isPending, isError, data } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const onTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  const todoHandler = () => {
    if (!title.trim() || !text.trim()) {
      toast.error<string>("제목과 내용 모두 입력하세요");
    } else {
      const newTodos = {
        id: `${new Date().getTime()}`,
        title: title,
        text: text,
        isCompleted: false,
      };
      addMutation.mutate(newTodos);
      setTitle("");
      setText("");
    }
  };

  const DeleteHandler = (id: string) => {
    deleteMutation.mutate(id);
  };
  const StateHandler = (id: string, isCompleted: boolean) => {
    toggleMutation.mutate({ id, isCompleted });
  };
  if (isPending) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

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
          <TodoBox
            data={data?.filter((data) => !data.isCompleted) ?? []}
            DeleteHandler={DeleteHandler}
            StateHandler={StateHandler}
          />
        </StyledTodoList>
        done{" "}
        <StyledTodoList>
          {" "}
          <TodoBox
            data={data?.filter((data) => data.isCompleted) ?? []}
            DeleteHandler={DeleteHandler}
            StateHandler={StateHandler}
          />
        </StyledTodoList>
      </StyledTodos>
    </>
  );
};

export default Homepage;
