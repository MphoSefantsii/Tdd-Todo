import React, { FC } from "react";
import TodoItem from "./TodoItem/TodoItem";

interface TodoProps {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoProps[];
  removeHandler: (id: string) => void;
  updateTodo: (id: string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, removeHandler, updateTodo }) => (
  <div>
    {todos.map((t, i) => (
      <TodoItem
        key={i}
        todo={t}
        removeHandler={removeHandler}
        updateTodo={updateTodo}
      />
    ))}
  </div>
);

export default TodoList;