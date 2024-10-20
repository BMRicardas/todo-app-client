import { RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import styles from "./text-input.module.css";
import { useId } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  options?: RegisterOptions;
};

export function TextInput({ label, name, options, ...props }: Props) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id={id}
          className={styles.input}
          {...register(name, options)}
          {...props}
        />
        <ErrorMessage
          errors={errors}
          name="text"
          render={({ message }) => (
            <p className={styles.errorMessage}>{message}</p>
          )}
        />
      </div>
    </div>
  );
}
