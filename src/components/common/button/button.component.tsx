import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          loading && styles.loading,
          className
        )}
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

Button.displayName = "Button";
