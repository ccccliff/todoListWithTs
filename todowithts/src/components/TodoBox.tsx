import {
  StyledBox,
  StyledBoxTitle,
  StyledBoxText,
  StyledButtons,
  StyledBtn,
} from "./StyledTodoBox";
import { RootState } from "../redux/config/configStore.js";
import { Todo } from "./../common/types";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodos, stateTodos } from "../redux/modules/todosSlice";
type Props = {
  todos: Todo[];
};
const TodoBox = ({ todos }: Props) => {
  const dispatch = useDispatch();
  const isUpdating = useSelector((state: RootState) => state.todos.isUpdating);
  const DeleteHandler = (todoId: number) => {
    dispatch(deleteTodos(todoId));
  };
  const StateHandler = (todoId: number) => {
    dispatch(stateTodos(todoId));
  };

  return (
    <>
      {todos.map((todo) => (
        <StyledBox key={todo.id}>
          <StyledBoxTitle>제목 : {todo.title}</StyledBoxTitle>
          <StyledBoxText>내용 : {todo.text}</StyledBoxText>
          <StyledButtons>
            <StyledBtn onClick={() => DeleteHandler(todo.id)}>삭제</StyledBtn>
            <StyledBtn
              disabled={isUpdating}
              onClick={() => StateHandler(todo.id)}
            >
              {todo.isCompleted ? "취소" : "완료"}
            </StyledBtn>
          </StyledButtons>
        </StyledBox>
      ))}
    </>
  );
};

export default TodoBox;
