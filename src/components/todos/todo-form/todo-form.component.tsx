import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useTodoStore } from "@/stores/todo.store";

import { TextInput } from "@/components/common/text-input/text-input.component";
import { Button } from "@/components/common/button/button.component";

import styles from "./todo-form.module.css";

const todoSchema = z.object({
  text: z
    .string()
    .min(3, "Todo must be at least 3 characters")
    .max(100, "Todo must be less than 100 characters"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export function TodoForm() {
  const { addTodo } = useTodoStore();
  const methods = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = async (data: TodoFormValues) => {
    await addTodo(data.text);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput name="text" placeholder="What needs to be done?" />
        <Button type="submit" color="primary">
          Add Todo
        </Button>
      </form>
    </FormProvider>
  );
}
