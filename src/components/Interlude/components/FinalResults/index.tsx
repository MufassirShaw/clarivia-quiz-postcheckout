import React, { useState, useEffect } from "react"
import styles from "./finalResults.module.css"
import { ProgressBar, ProgressBarVariants } from "@/components/ProgressBar"

interface FinalResultsProps {
  handleSubmit: () => void
}

const steps = [
  {
    type: "loading",
    text: "Setting Goals",
    progress: 24,
    duration: 2000,
  },
  {
    type: "popup",
    question: "Are you determined to finally clear your nail fungus?",
    duration: 0,
  },
  {
    type: "loading",
    text: "Reviewing medical history",
    progress: 48,
    duration: 2000,
  },
  {
    type: "popup",
    question:
      "Did you know that nail fungus affects 1 in 10 adults and can spread if untreated?",
    duration: 0,
  },
  {
    type: "loading",
    text: "Finalizing your recommendations...",
    progress: 100,
    duration: 3000,
    showContinue: true,
  },
]

export const FinalResults = ({ handleSubmit }: FinalResultsProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const step = steps[currentStep]

  useEffect(() => {
    if (!step || step.type !== "loading" || step.showContinue) return
    const duration = step.duration || 100
    const handler = setTimeout(() => {
      setCurrentStep((s) => s + 1)
    }, duration)

    return () => {
      clearTimeout(handler)
    }
  }, [step])

  const nextStep = () => {
    setCurrentStep((s) => s + 1)
  }

  if (!step) return null

  return (
    <div className={styles.spartanLoadingPage}>
      {step.type === "loading" && (
        <div className={styles.loadingContent}>
          <p className={styles.loadingText}>{step.text}</p>
          <ProgressBar
            progress={step.progress || 0}
            variant={ProgressBarVariants.Dynamic}
          />
          {step.showContinue && (
            <div className="button-container">
              <button
                className="primary-button"
                id="continueBtn"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
      {step.type === "popup" && (
        <div className={styles.spartanPopupOverlay}>
          <div className={styles.popupContentDirect}>
            <p className={styles.popupSubtitle}>
              To move forward, please specify
            </p>
            <h3 className={styles.popupQuestion}>{step.question}</h3>
            <div className={styles.popupButtons}>
              <button
                className={`${styles.popupBtn} ${styles.no}`}
                onClick={nextStep}
              >
                No
              </button>
              <button
                className={`${styles.popupBtn} ${styles.yes}`}
                onClick={nextStep}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
