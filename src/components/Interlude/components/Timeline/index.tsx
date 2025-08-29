import { useMemo } from "react"
import styles from "./timeline.module.css"

const currentMonth = new Date().toLocaleString("default", { month: "long" })

interface TimelineProps {
  handleSubmit: () => void
  severity: number
}

const WEEKS: Record<number, number> = {
  1: 6,
  2: 8,
  3: 10,
  4: 12,
}

export const Timeline = ({ handleSubmit, severity = 2 }: TimelineProps) => {
  const endDate = useMemo(() => {
    const weeks = WEEKS[severity]

    const date = new Date()
    date.setDate(date.getDate() + weeks * 7)
    return date.toLocaleString("default", { month: "long", year: "numeric" })
  }, [severity])

  return (
    <div className={styles.spartanTimelinePage}>
      <h2 className={styles.spartanTimelineTitle}>
        Your personalized path to clear nails
      </h2>
      <p className={styles.spartanTimelineSubtitle}>
        Based on your answers, we expect you to see visible improvement{" "}
        {endDate}
      </p>
      <div className={styles.timelineBarsContainer}>
        <div className={`${styles.timelineBar} ${styles.bar1}`}>
          <div className={styles.barFill} />
        </div>
        <div className={`${styles.timelineBar} ${styles.bar2}`}>
          <div className={styles.barFill} />
        </div>
        <div className={`${styles.timelineBar} ${styles.bar3}`}>
          <div className={styles.barFill} />
        </div>
        <div className={`${styles.timelineBar} ${styles.bar4}`}>
          <div className={styles.barFill} />
          <div className={styles.goalMarker}>
            <span>Goal</span>
            <div className={styles.goalCircle}></div>
          </div>
        </div>
        <div className={`${styles.timelineBar} ${styles.bar5}`}>
          <div className={styles.barFill} />
        </div>
        <div className={`${styles.timelineBar} ${styles.bar6}`}>
          <div className={styles.barFill} />
        </div>
      </div>

      <div className={styles.timelineDates}>
        <span>{currentMonth}</span>
        <span>{endDate.split(" ")[0]}</span>
      </div>

      <div className="button-container">
        <button
          className="primary-button"
          id="continueBtn"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
