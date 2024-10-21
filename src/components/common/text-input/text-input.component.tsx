import React, { useId } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { clsx } from "clsx";

import styles from "./text-input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  options?: RegisterOptions;
};

export function TextInput({
  label,
  name,
  options,
  className,
  ...props
}: Props) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <div className={clsx(styles.inputGroup, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id={id}
          className={clsx(styles.input, {
            [styles.error]: hasError,
          })}
          {...register(name, options)}
          {...props}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className={styles.errorMessage}>{message}</p>
          )}
        />
      </div>
    </div>
  );
}
