import { InputHTMLAttributes, useId } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { clsx } from "clsx";

import styles from "./checkbox-input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  options?: RegisterOptions;
};

export function CheckboxInput({
  label,
  name,
  options,
  className,
  ...rest
}: Props) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.wrapper}>
        <input
          id={id}
          type="checkbox"
          className={styles.input}
          {...register(name, options)}
          {...rest}
        />
        <span className={styles.checkbox}></span>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className={styles.error}>{message}</p>}
      />
    </div>
  );
}
