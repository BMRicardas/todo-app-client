import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TextInput } from "@/components/common/text-input/text-input.component";
import { Button } from "@/components/common/button/button.component";
import { Loading } from "@/components/common/loading/loading.coponent";

import styles from "./todo-form.module.css";

const todoSchema = z.object({
  text: z
    .string()
    .min(3, "Todo must be at least 3 characters")
    .max(100, "Todo must be less than 100 characters"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

interface Props {
  onSubmit: (data: TodoFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function TodoForm({ onSubmit, isSubmitting }: Props) {
  const methods = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: "",
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmitHandler = async (data: TodoFormValues) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Failed to add todo:", error);
      methods.setError("text", {
        type: "submit",
        message: "Failed to add todo. Please try again.",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <TextInput
          name="text"
          placeholder="What needs to be done?"
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting} variant="submit">
          {isSubmitting ? (
            <>
              <Loading size="sm" />
              <span>Adding...</span>
            </>
          ) : (
            "Add Todo"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
