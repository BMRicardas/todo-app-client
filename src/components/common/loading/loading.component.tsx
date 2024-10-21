import { clsx } from "clsx";
import styles from "./loading.module.css";

type LoadingSize = "sm" | "md" | "lg";
type LoadingColor =
  | "primary"
  | "white"
  | "green"
  | "success"
  | "danger"
  | "warning";

interface Props {
  size?: LoadingSize;
  color?: LoadingColor;
  fullScreen?: boolean;
  inline?: boolean;
  className?: string;
}

export function Loading({
  size = "md",
  color = "primary",
  fullScreen = false,
  inline = false,
  className,
}: Props) {
  const containerClass = clsx(
    styles.loading,
    {
      [styles.fullScreen]: fullScreen,
      [styles.inline]: inline,
    },
    className
  );

  const spinnerClass = clsx(styles.spinner, styles[size], styles[color]);

  return (
    <div className={containerClass}>
      <div className={spinnerClass} role="status" aria-label="Loading">
        <span className={styles.visuallyHidden}>Loading...</span>
      </div>
    </div>
  );
}
