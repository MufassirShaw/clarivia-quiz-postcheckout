"use client"

import { useState } from "react"
import styles from "./SingleChoiceQuestion.module.css"

interface SingleChoiceOption {
  value: string
  label: string
}

interface SingleChoiceQuestionProps {
  question: {
    id: string
    title: string
    subtitle?: string
    options: SingleChoiceOption[]
  }
  onAnswer: (answer: any) => void
  currentAnswer?: any
}

export default function SingleChoiceQuestion({
  question,
  onAnswer,
  currentAnswer,
}: SingleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    currentAnswer?.value || null
  )

  const handleOptionSelect = (option: SingleChoiceOption) => {
    setSelectedOption(option.value)
    onAnswer({
      value: option.value,
      label: option.label,
    })
  }

  return (
    <div className={styles.singleChoiceOptions}>
      {question.options.map((option) => (
        <button
          key={option.value}
          className={`${styles.singleChoiceOption} ${
            selectedOption === option.value ? styles.selected : ""
          }`}
          onClick={() => handleOptionSelect(option)}
          type="button"
        >
          <div className={styles.optionContent}>
            <div className={styles.optionLabel}>{option.label}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
