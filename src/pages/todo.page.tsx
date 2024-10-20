import { getTodos } from "@/api/todo.service";
import { Loading } from "@/components/common/loading/loading.coponent";
import { TodoForm } from "@/components/todos/todo-form/todo-form.component";
import { TodoList } from "@/components/todos/todo-list/todo-list.component";
import { useTodoActions } from "@/hooks/todos/use-todo-actions.hook";
import { useTodos } from "@/hooks/todos/use-todo.hook";
import { Suspense } from "react";

export function TodoPage() {
  const {
    todos,
    setTodos,
    // loading: todosLoading,
    error: todosError,
  } = useTodos();
  const {
    addTodo,
    editTodo,
    removeTodo,
    loading: actionsLoading,
    error: actionsError,
  } = useTodoActions();

  const handleAddTodo = async ({ text }: { text: string }) => {
    try {
      await addTodo({ text });
      const newTodos = await getTodos();
      setTodos(newTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id: number, status: boolean) => {
    const todo = todos.find((t) => t._id === id);
    if (todo) {
      await editTodo(id, { status, text: todo.text }).then(() => {
        const newTodos = todos.map((t) =>
          t._id === id ? { ...t, status } : t
        );
        setTodos(newTodos);
      });
    }
  };

  const handleDelete = async (id: number) => {
    await removeTodo(id);
  };

  if (todosError || actionsError) {
    return (
      <div>
        Error:{" "}
        {(todosError as Error)?.message || (actionsError as Error)?.message}
      </div>
    );
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onSubmit={handleAddTodo} isSubmitting={actionsLoading} />
      <TodoList
        todos={todos}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
