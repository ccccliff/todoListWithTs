export type Todo = {
  id: number;
  title: string;
  text: string;
  isCompleted: boolean;
};

export type initialStateType = {
  item: Todo[];
  isUpdating: boolean;
};
