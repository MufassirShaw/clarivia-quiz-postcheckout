"use client"
import Quiz from "@/components/Quiz"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.quizContainer}>
      <header className={styles.trustHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Clarivia</h1>
          <div className={styles.trustBadges}>
            <span className={styles.badge}>Prescription-Strength Formula</span>
            <span className={styles.badge}>HIPAA Secure</span>
          </div>
        </div>
      </header>
      <Quiz />
      <footer className={styles.trustFooter}>
        <div className={styles.securityInfo}>
          <svg
            className={styles.lockIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12 7V5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5V7M5 15H11C12.1046 15 13 14.1046 13 13V9C13 7.89543 12.1046 7 11 7H5C3.89543 7 3 7.89543 3 9V13C3 14.1046 3.89543 15 5 15Z"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
          </svg>
          <span>Your information is 100% secure and confidential</span>
        </div>
      </footer>
    </div>
  )
}
