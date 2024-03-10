export type Todo = {
  id: string;
  title: string;
  text: string;
  isCompleted: boolean;
};

export type initialStateType = {
  item: Todo[];
  isUpdating: boolean;
};
