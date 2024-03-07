import {
  StyledBox,
  StyledBoxTitle,
  StyledBoxText,
  StyledButtons,
  StyledBtn,
} from "./StyledTodoBox";
import { Todo } from "./../common/types";
type Props = {
  todos: Todo[];
  DeleteHandler: (todoKey: number) => void;
  StateHandler: (index: number) => void;
  isUpdating: boolean;
};
const TodoBox = ({ todos, DeleteHandler, StateHandler, isUpdating }: Props) => {
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
