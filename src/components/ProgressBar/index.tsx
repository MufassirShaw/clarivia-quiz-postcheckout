import { useEffect, useState } from "react"
import styles from "./ProgressBar.module.css"

export enum ProgressBarVariants {
  Static = "static",
  Dynamic = "dynamic",
}
interface ProgressBarProps {
  progress: number
  variant?: ProgressBarVariants
  duration?: number // duration in ms
}

const ProgressBarDynamic = ({
  progress: target,
  duration = 1500,
}: ProgressBarProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start: number | null = null
    const stepFn = (timestamp: number) => {
      if (!start) start = timestamp
      const timeProgress = Math.min((timestamp - start) / duration, 1) // 0 → 1
      const animatedValue = Math.floor(timeProgress * target)
      setCount(animatedValue)
      if (timeProgress < 1) requestAnimationFrame(stepFn)
    }
    requestAnimationFrame(stepFn)
  }, [target, duration])

  return (
    <div>
      <div className={styles.spartanProgressBar}>
        <div
          className={styles.spartanProgressFill}
          style={{ width: `${count}%` }}
        />
      </div>
      <p className={styles.loadingPercentage}>{count} %</p>
    </div>
  )
}

export const ProgressBar = ({
  progress,
  variant = ProgressBarVariants.Static,
  duration,
}: ProgressBarProps) => {
  if (variant === ProgressBarVariants.Dynamic) {
    return <ProgressBarDynamic progress={progress} duration={duration} />
  }

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
        {Math.floor(progress)}% Complete
      </div>
    </div>
  )
}
