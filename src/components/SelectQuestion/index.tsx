import React, { useState } from "react"
import styles from "./selectQuestion.module.css"
import { ILead } from "@/type/lead"

interface Option {
  value: string
  name: string
}

interface FormProps {
  onAnswer: (state: Partial<ILead>) => Promise<void>
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await onAnswer({ lead_state: selectedOption })
    setIsSubmitting(false)
  }

  return (
    <div>
      {banner && <div className={styles.urgencyBanner}>{banner}</div>}
      <div>
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
            disabled={!selectedOption || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  )
}
