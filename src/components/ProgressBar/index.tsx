import styles from "./ProgressBar.module.css"
export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div className={styles.progressText}>
        {Math.round(progress)}% Complete
      </div>
    </div>
  )
}
