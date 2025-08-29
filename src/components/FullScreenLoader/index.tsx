import styles from "./fullscreenLoader.module.css"

export const FullScreenLoader = ({
  text = "loading...",
}: {
  text?: string
}) => (
  <>
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p className={styles.text}>{text}</p>
    </div>
  </>
)
