import { getTodo, getTodos } from "@/api/todo.service";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todos = await getTodos();
        setTodos(todos);
        return todos;
      } catch (error: unknown) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  return { todos, loading, error, setTodos };
}

export function useTodo(id: number) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const todo = await getTodo(id);
        setTodo(todo);
        return todo;
      } catch (error: unknown) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodo();
  }, [id]);

  return { todo, loading, error };
}
