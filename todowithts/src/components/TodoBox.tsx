import {
  StyledBox,
  StyledBoxTitle,
  StyledBoxText,
  StyledButtons,
  StyledBtn,
} from "./StyledTodoBox";
import { Todo } from "./../common/types";
type Props = {
  data: Todo[];
  DeleteHandler: (id: string) => void;
  StateHandler: (id: string, isCompleted: boolean) => void;
};
const TodoBox = ({ data, DeleteHandler, StateHandler }: Props) => {
  return (
    <>
      {data.map((data) => (
        <StyledBox key={data.id}>
          <StyledBoxTitle>제목 : {data.title}</StyledBoxTitle>
          <StyledBoxText>내용 : {data.text}</StyledBoxText>
          <StyledButtons>
            <StyledBtn onClick={() => DeleteHandler(data.id)}>삭제</StyledBtn>
            <StyledBtn onClick={() => StateHandler(data.id, data.isCompleted)}>
              {data.isCompleted ? "취소" : "완료"}
            </StyledBtn>
          </StyledButtons>
        </StyledBox>
      ))}
    </>
  );
};

export default TodoBox;
