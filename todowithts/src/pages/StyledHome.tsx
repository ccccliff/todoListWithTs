import styled from "styled-components";

type StyledInputType = {
  primary?: boolean;
};

export const StyledHeader = styled.div`
  width: 100%;
  height: 30vh;
  background-color: ivory;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
`;
export const StyledTitle = styled.div`
  font-size: 40px;
`;
export const StyledInputArea = styled.div``;
export const StyledInput = styled.input<StyledInputType>`
  width: ${(props) => (props.primary ? "200px" : "500px")};
  height: 80px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px;
`;
export const StyledTodos = styled.div`
  height: 70vh;
  background-color: lightgray;
  padding: 20px;
`;
export const StyledTodoList = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-top: 20px;
`;
