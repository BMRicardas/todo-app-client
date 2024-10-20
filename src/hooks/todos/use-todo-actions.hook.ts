import { createTodo, deleteTodo, updateTodo } from "@/api/todo.service";
import { Todo } from "@/types/todo";
import { useState } from "react";

export function useTodoActions() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  async function addTodo(todo: Omit<Todo, "_id" | "status">) {
    setLoading(true);
    setError(null);
    try {
      const createdTodo = await createTodo(todo);
      return createdTodo;
    } catch (err) {
      console.error("Failed to create todo:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function editTodo(
    id: number,
    updatedFields: { text: string; status: boolean }
  ) {
    setLoading(true);
    setError(null);
    try {
      const updatedTodo = await updateTodo(id, updatedFields);
      return updatedTodo;
    } catch (err) {
      console.error("Failed to update todo:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function removeTodo(id: number) {
    setLoading(true);
    setError(null);
    try {
      await deleteTodo(id);
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { addTodo, editTodo, removeTodo, loading, error };
}
