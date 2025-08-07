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
  onAnswer: (answer: string[]) => void
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

  const handleOptionToggle = (option: MultipleChoiceOption) => {
    const newSelectedOptions = selectedOptions.includes(option.value)
      ? selectedOptions.filter((value) => value !== option.value)
      : [...selectedOptions, option.value]

    setSelectedOptions(newSelectedOptions)
    // onAnswer({
    //   values: newSelectedOptions,
    //   labels: newSelectedOptions
    //     .map(
    //       (value) => question.options.find((opt) => opt.value === value)?.label
    //     )
    //     .filter(Boolean),
    // })
  }

  const handleSubmit = () => {
    onAnswer(selectedOptions)
  }

  return (
    <div className={styles.optionsList}>
      {question.options.map((option) => (
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
          disabled={!selectedOptions?.length}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
