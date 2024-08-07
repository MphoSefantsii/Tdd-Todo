import React, { useState } from "react";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  removeTodo: (id: string) => void;
  updateTodo: (id: string) => string;
  editTodoTitle: (id: string, newTitle: string) => string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  removeTodo,
  updateTodo,
  editTodoTitle,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEditClick = () => {
    if (editMode) {
      editTodoTitle(todo.id, newTitle);
    }
    setEditMode(!editMode);
  };

  return (
    <div className={styles["todo-item"]}>
      {editMode ? (
        <input
          title="title"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span
          className={styles["todo-title"]}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </span>
      )}
      <input
        title="checkbox"
        className={styles["checkbox"]}
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo.id)}
        data-testid={`checkbox-${todo.id}`}
      />
      <button
        className={styles["edit-button"]}
        onClick={handleEditClick}
        data-testid={`edit-btn-${todo.id}`}
      >
        {editMode ? "Save" : "Edit"}
      </button>
      <button
        className={styles["remove-button"]}
        data-testid={`close-btn-${todo.id}`}
        onClick={() => removeTodo(todo.id)}
      >
        &times;
      </button>
    </div>
  );
};

export default TodoItem;