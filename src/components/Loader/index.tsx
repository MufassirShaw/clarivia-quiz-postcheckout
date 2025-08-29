import styles from "./loader.module.css"

export const Loader = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
  </div>
)
