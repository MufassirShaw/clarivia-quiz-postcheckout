"use client"

import { useState } from "react"
import styles from "./MultipleChoiceQuestion.module.css"

interface MultipleChoiceOption {
  value: string
  label: string
}

export interface MultipleChoiceQuestionType {
  id: string
  title: string
  subtitle?: string
  options: MultipleChoiceOption[]
}

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType
  onAnswer: (answer: string[]) => Promise<void>
  currentAnswer?: string[]
}

export default function MultipleChoiceQuestion({
  question,
  onAnswer,
  currentAnswer,
}: MultipleChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentAnswer || []
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOptionToggle = (option: MultipleChoiceOption) => {
    const newSelectedOptions = selectedOptions.includes(option.value)
      ? selectedOptions.filter((value) => value !== option.value)
      : [...selectedOptions, option.value]

    setSelectedOptions(newSelectedOptions)
  }

  const options = question.options ?? []
  const handleSubmit = async () => {
    setIsSubmitting(true)
    const selected = options
      .filter((op) => {
        return selectedOptions.includes(op.value)
      })
      .map((op) => op.label)

    await onAnswer(selected)
    setIsSubmitting(false)
  }

  return (
    <div className={styles.optionsList}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.optionItem} ${
            selectedOptions.includes(option.value) ? styles.selected : ""
          }`}
          onClick={() => handleOptionToggle(option)}
          type="button"
        >
          <input
            type="checkbox"
            name={option.label}
            value={option.value}
            className={styles.optionCheckbox}
            onChange={() => handleOptionToggle(option)}
            checked={selectedOptions.includes(option.value)}
          />
          <span className={styles.optionLabel}>{option.label}</span>
        </button>
      ))}

      <div className="button-container">
        <button
          className="primary-button"
          onClick={handleSubmit}
          disabled={!selectedOptions?.length || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </div>
    </div>
  )
}
