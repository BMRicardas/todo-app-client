import { AxiosResponse } from "axios";

import { axiosInstance } from "./axios.instance";
import { Todo } from "@/types/todo";

export async function getTodos(): Promise<Todo[]> {
  const response = await axiosInstance.get("/todos");

  return response.data;
}

export async function getTodo(id: number): Promise<Todo> {
  const response = await axiosInstance.get(`/todos/${id}`);

  return response.data;
}

export async function createTodo(
  todo: Omit<Todo, "_id" | "status">
): Promise<Todo> {
  const response = await axiosInstance.post("/todos", todo);
  return response.data;
}

export async function updateTodo(
  id: number,
  todo: { text: string; status: boolean }
): Promise<Todo> {
  const response = await axiosInstance.put(`/todos/${id}`, todo);

  return response.data;
}

export async function deleteTodo(id: number): Promise<AxiosResponse<void>> {
  const response = await axiosInstance.delete(`/todos/${id}`);

  return response.data;
}
