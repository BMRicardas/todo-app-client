import { Loading } from "@/components/common/loading/loading.component";
import { TodoItem } from "@/components/todos/todo-item/todo-item.component";
import { useTodoStore } from "@/stores/todo.store";

import styles from "./todo-list.module.css";
import { useEffect } from "react";

export function TodoList() {
  const { todos, loading, error, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorState}>Error: {error}</div>;
  }

  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
