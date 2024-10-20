import { ComponentProps, forwardRef, ReactNode } from "react";

import styles from "./button.module.css";

type Props = ComponentProps<"button"> & {
  children: ReactNode;
  variant?: "submit" | "edit" | "delete";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      variant = "submit",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${
          loading ? styles.loading : ""
        }`}
        disabled={disabled || loading}
        {...props}>
        {loading && <span className={styles.spinner} />}
        {!loading && icon && iconPosition === "left" && (
          <span className={styles.iconLeft}>{icon}</span>
        )}
        <span className={styles.content}>{children}</span>
        {!loading && icon && iconPosition === "right" && (
          <span className={styles.iconRight}>{icon}</span>
        )}
      </button>
    );
  }
);
