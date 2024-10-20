// todo-item.component.tsx
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Todo } from "@/types/todo";
import { CheckboxInput } from "@/components/common/checkbox-input/checkbox-input.component";
import { TextInput } from "@/components/common/text-input/text-input.component";
import { Button } from "@/components/common/button/button.component";
import { Loading } from "@/components/common/loading/loading.coponent";

import styles from "./todo-item.module.css";

type Props = {
  todo: Todo;
  onStatusChange: (id: number, status: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, todo: Todo) => Promise<void>;
};

export function TodoItem({ todo, onStatusChange, onDelete, onEdit }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: {
      text: todo.text,
      status: todo.status,
    },
  });

  const { setError, reset, handleSubmit, watch } = methods;

  const text = watch("text");

  const handleStatusChange = async () => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      await onStatusChange(todo._id, !todo.status);
    } catch (error) {
      console.error("Failed to update todo status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await onDelete(todo._id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async (data: { text: string; status: boolean }) => {
    try {
      await onEdit(todo._id, data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to edit todo:", error);
      setError("text", {
        type: "submit",
        message: "Failed to edit todo. Please try again.",
      });
    }
  };

  function handleCancelEdit() {
    reset({ text: todo.text });
    setIsEditing(false);
  }

  return (
    <div className={styles.todoItem}>
      <FormProvider {...methods}>
        <form
          className={styles.todoContent}
          onSubmit={handleSubmit(handleEdit)}>
          <div className={styles.mainContent}>
            <CheckboxInput
              name="status"
              checked={todo.status}
              onChange={handleStatusChange}
              disabled={isUpdating || isEditing}
            />

            {isEditing ? (
              <div className={styles.editInput}>
                <TextInput
                  name="text"
                  options={{
                    required: "Todo text is required",
                    minLength: {
                      value: 3,
                      message: "Todo must be at least 3 characters",
                    },
                  }}
                />
              </div>
            ) : (
              <span
                className={`${styles.todoText} ${
                  todo.status ? styles.completed : ""
                }`}>
                {todo.text}
              </span>
            )}
          </div>
          <div className={styles.actions}>
            {isEditing ? (
              todo.text === text ? (
                <Button type="button" onClick={handleCancelEdit} variant="edit">
                  Cancel
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="edit"
                  disabled={methods.formState.isSubmitting}>
                  Save
                </Button>
              )
            ) : (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                variant="edit">
                Edit
              </Button>
            )}
            {!isEditing ? (
              <Button
                type="button"
                onClick={handleDelete}
                variant="delete"
                disabled={isDeleting || isEditing}>
                {isDeleting ? (
                  <>
                    <Loading size="sm" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
