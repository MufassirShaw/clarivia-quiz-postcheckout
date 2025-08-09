"use client"
import Image from "next/image"
import styles from "./NailProfile.module.css"
import { useMemo } from "react"

interface NailProfileProps {
  severity?: number
  duration: string
  handleSubmit: () => void
}

enum Levels {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

const LevelsPositions = { Low: 25, Medium: 50, High: 75, Severe: 90 }

const MetricCard = ({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value: string
}) => (
  <div className={styles.metricCard}>
    <span className={styles.metricIcon}>{icon}</span>
    <div className={styles.metricContent}>
      <div className={styles.metricLabel}>{label}</div>
      <div className={styles.metricValue}>{value}</div>
    </div>
  </div>
)

export const NailProfile = ({
  severity = 2,
  duration,
  handleSubmit,
}: NailProfileProps) => {
  const profile = useMemo(() => {
    let level = Levels.MEDIUM
    if (severity >= 3 || duration === "over_12_months") {
      level = Levels.HIGH
    }

    const profileImage = `/images/severity/${severity}.png`

    if (severity === 1 && duration === "less_3_months") {
      level = Levels.LOW
    }

    let description =
      "Moderate fungal infection. This requires prescription-strength treatment."
    if (level === Levels.HIGH) {
      description =
        "Your nails show significant fungal infection. This requires prescription-strength treatment"
    }

    if (level === Levels.LOW) {
      description =
        "Early stage infection detected. This requires prescription-strength treatment."
    }

    return {
      level: level,
      description,
      fungusType: "Dermatophyte",
      treatmentDifficulty: level,
      appearanceImpact: severity >= 3 ? "Significant" : "Moderate",
      position: LevelsPositions[level],
      profileImage,
    }
  }, [duration, severity])

  const levelClass = profile.level.toLowerCase()
  const validLevelClass = ["low", "medium", "high"].includes(levelClass)
    ? styles[levelClass as "low" | "medium" | "high"]
    : ""

  return (
    <div className={styles.spartanProfilePage}>
      <h2 className={styles.spartanTitle}>
        Summary of your Nail Health Profile
      </h2>

      <div className={styles.spartanLevelSection}>
        <h3 className={styles.spartanSubtitle}>Level of nail infection</h3>

        <div className={styles.profileVisual}>
          <Image
            src={profile.profileImage}
            alt="Profile"
            className={styles.profileImage}
            width={100}
            height={150}
          />
        </div>

        <div className={styles.levelIndicatorWrapper}>
          <div
            className={styles.levelArrow}
            style={
              {
                "--target-position": `${profile.position}%`,
              } as React.CSSProperties
            }
          >
            <div className={styles.arrowBox}>Your level</div>
            <div className={styles.arrowPoint}></div>
          </div>

          <div className={styles.gradientBar}></div>
          <div className={styles.levelLabels}>
            <span>Low</span>
            <span>Normal</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        <div className={`${styles.levelDescription} ${validLevelClass}`}>
          <div className={styles.levelIcon}>!</div>
          <div className={styles.levelText}>
            <strong>{profile.level.toUpperCase()} level</strong>
            <p>{profile.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.profileMetricsGrid}>
        <MetricCard icon="🦠" label="Fungus type" value={profile.fungusType} />
        <MetricCard
          icon="📊"
          label="Room For Improvement"
          value={profile.level}
        />
        <MetricCard icon="⚡" label="Treatment Urgency" value={profile.level} />
        <MetricCard
          icon="🔍"
          label="Impact on Appearance"
          value={profile.appearanceImpact}
        />
      </div>

      <div className="button-container" onClick={handleSubmit}>
        <button className="primary-button" id="continueBtn">
          Continue
        </button>
      </div>
    </div>
  )
}
