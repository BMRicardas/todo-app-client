import { create } from "zustand";
import { Todo } from "@/types/todo";
import {
  createTodo as addTodoAction,
  updateTodo as editTodoAction,
  deleteTodo as removeTodoAction,
  getTodos,
} from "@/api/todo.service";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  editTodo: (id: number, updatedTodo: Todo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await getTodos();
      set({ todos, loading: false });
    } catch (error) {
      console.error("Failed to fetch todos: ", error);
      set({ error: "Failed to fetch todos", loading: false });
    }
  },

  addTodo: async (text: string) => {
    set({ loading: true, error: null });
    try {
      const newTodo = await addTodoAction({ text });
      set((state) => ({ todos: [...state.todos, newTodo], loading: false }));
    } catch (error) {
      console.error("Failed to add todo: ", error);
      set({ error: "Failed to add todo", loading: false });
    }
  },

  editTodo: async (id: number, updatedTodo: Todo) => {
    set({ loading: true, error: null });
    try {
      await editTodoAction(id, updatedTodo);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, ...updatedTodo } : todo
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to edit todo: ", error);
      set({ error: "Failed to edit todo", loading: false });
    }
  },

  deleteTodo: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await removeTodoAction(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to delete todo: ", error);
      set({ error: "Failed to delete todo", loading: false });
    }
  },
}));
