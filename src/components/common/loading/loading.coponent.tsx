import styles from "./loading.module.css";

type LoadingSize = "sm" | "md" | "lg";
type LoadingColor = "primary" | "white" | "gray";

interface Props {
  size?: LoadingSize;
  color?: LoadingColor;
  fullScreen?: boolean;
}

export function Loading({ 
  size = "md", 
  color = "primary",
  fullScreen = false 
}: Props) {
  return (
    <div className={`${styles.loading} ${fullScreen ? styles.fullScreen : ''}`}>
      <div
        className={`${styles.spinner} ${styles[size]} ${styles[color]}`}
        role="status"
        aria-label="Loading"
      >
        <span className={styles.visuallyHidden}>Loading...</span>
      </div>
    </div>
  );
}
