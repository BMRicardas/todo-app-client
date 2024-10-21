import { useState } from "react";
import styles from "./todo-item.module.css";
import { Todo } from "@/types/todo";

import { FormProvider, useForm } from "react-hook-form";
import { CheckboxInput } from "@/components/common/checkbox-input/checkbox-input.component";
import { TextInput } from "@/components/common/text-input/text-input.component";
import { Button } from "@/components/common/button/button.component";

import { clsx } from "clsx";
import { useTodoStore } from "@/stores/todo.store";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { editTodo, deleteTodo } = useTodoStore();
  const methods = useForm<Todo>({
    defaultValues: todo,
  });

  console.log(`TodoItem rendering for todo: ${todo._id}`);

  const handleStatusChange = async () => {
    try {
      await editTodo(todo._id, { ...todo, status: !todo.status });
    } catch (error) {
      console.error("Failed to update todo status:", error);
    }
  };

  const handleEdit = async (editedTodo: Todo) => {
    if (editedTodo.text === todo.text) {
      toggleEditMode();
      return;
    }

    console.log("data:", editedTodo);
    try {
      await editTodo(todo._id, editedTodo);
    } catch (error) {
      console.error("Failed to edit todo:", error);
    } finally {
      toggleEditMode();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  function toggleEditMode() {
    setIsEditing((prev: boolean) => !prev);
  }

  return (
    <div className={styles.todoItem}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleEdit)}>
          <div className={styles.todoContent}>
            <CheckboxInput
              name="status"
              checked={todo.status}
              onChange={handleStatusChange}
            />

            {isEditing ? (
              <TextInput
                name="text"
                autoFocus
                options={{
                  required: "Todo text is required",
                  minLength: {
                    value: 3,
                    message: "Todo must be at least 3 characters",
                  },
                }}
              />
            ) : (
              <span
                className={clsx(styles.todoText, {
                  [styles.completed]: todo.status,
                })}>
                {todo.text}
              </span>
            )}
            <div className={styles.actions}>
              {isEditing ? (
                <>
                  <Button type="submit" variant="success">
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      toggleEditMode();
                    }}
                    variant="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      toggleEditMode();
                    }}
                    variant="primary">
                    Edit
                  </Button>
                  <Button type="button" onClick={handleDelete} variant="danger">
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
