import { TodoForm } from "@/components/todos/todo-form/todo-form.component";
import { TodoList } from "@/components/todos/todo-list/todo-list.component";

import style from "./todo.page.module.css";

export function TodoPage() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
