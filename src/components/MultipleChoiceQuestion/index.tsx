"use client"

import { useState } from "react"
import styles from "./MultipleChoiceQuestion.module.css"

interface MultipleChoiceOption {
  value: string
  label: string
}

interface MultipleChoiceQuestionProps {
  question: {
    id: string
    title: string
    subtitle?: string
    options: MultipleChoiceOption[]
  }
  onAnswer: (answer: any) => void
  currentAnswer?: any
}

export default function MultipleChoiceQuestion({
  question,
  onAnswer,
  currentAnswer,
}: MultipleChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentAnswer?.values || []
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
            checked={selectedOptions.includes(option.value)}
          />
          <span className={styles.optionLabel}>{option.label}</span>
        </button>
      ))}
    </div>
  )
}
