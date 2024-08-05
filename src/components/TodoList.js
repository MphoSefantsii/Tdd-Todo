import React from "react";
import TodoItem from "./TodoItem/TodoItem";

const TodoList = ({ todos, removeHandler }) => (
  <div>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        removeHandler={removeHandler}
        updateTodo={() => {}}
      />
    ))}
  </div>
);

export default TodoList;
