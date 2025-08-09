import React, { useState } from "react"
import styles from "./selectQuestion.module.css"

interface Option {
  value: string
  name: string
}

interface FormProps {
  onAnswer: (answer: string) => void
  required?: boolean
  placeholder?: string
  options: Option[]
  banner?: string
  label: string
  name?: string
  currentAnswer?: string
}

export const SelectQuestion: React.FC<FormProps> = ({
  label,
  banner,
  onAnswer,
  required,
  options,
  currentAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(currentAnswer ?? "")

  return (
    <div>
      {banner && <div className={styles.urgencyBanner}>{banner}</div>}
      <form
        id="questionForm"
        onSubmit={(e) => {
          e.preventDefault()
          onAnswer(selectedOption)
        }}
      >
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{label}</label>
          <select
            className={styles.formSelect}
            required={required}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select {label}</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        <div className="button-container">
          <button
            className="primary-button"
            type="submit"
            disabled={!selectedOption}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}
