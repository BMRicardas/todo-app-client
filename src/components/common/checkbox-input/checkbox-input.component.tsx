import { InputHTMLAttributes, useId } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import styles from "./checkbox-input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  options?: RegisterOptions;
};

export function CheckboxInput({ label, name, options, ...rest }: Props) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          id={id}
          type="checkbox"
          className={styles.checkbox}
          {...register(name, options)}
          {...rest}
        />
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        name="text"
        render={({ message }) => <p className={styles.error}>{message}</p>}
      />
    </div>
  );
}
