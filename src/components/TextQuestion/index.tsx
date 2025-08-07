"use client"

import { useState } from "react"
import styles from "./TextQuestion.module.css"

interface TextQuestionProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  onAnswer: (answer: string) => void
  currentAnswer?: string
  placeholder?: string
  required?: boolean
  id: string
  title?: string
  label?: string
}

export default function TextQuestion({
  onAnswer,
  currentAnswer,
  placeholder = "Type your answer here...",
  required = false,
  label,
  ...rest
}: TextQuestionProps) {
  const [answer, setAnswer] = useState<string>(currentAnswer || "")

  const handleSubmit = () => {
    onAnswer(answer.trim())
  }

  return (
    <div className={styles.formFields}>
      <div className={styles.formField}>
        <label htmlFor={rest.id} className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={styles.formTextarea}
          rows={4}
          {...rest}
        />
      </div>
      <div className="button-container">
        <button
          className="primary-button"
          onClick={handleSubmit}
          disabled={!answer.trim() && required}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
