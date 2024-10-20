import { Todo } from "@/types/todo";

import styles from "./todo-list.module.css";
import { TodoItem } from "../todo-item/todo-item.component";
import { Loading } from "@/components/common/loading/loading.coponent";

interface Props {
  todos: Todo[];
  onStatusChange: (id: number, status: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, text: string) => Promise<void>;
  isLoading?: boolean;
}

export function TodoList({
  todos,
  onStatusChange,
  onDelete,
  onEdit,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <Loading size="lg" />
      </div>
    );
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
        <TodoItem
          key={todo._id}
          todo={todo}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
