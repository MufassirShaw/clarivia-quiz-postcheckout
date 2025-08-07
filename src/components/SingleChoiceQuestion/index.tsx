"use client"

import { useState } from "react"
import styles from "./SingleChoiceQuestion.module.css"

interface SingleChoiceOption {
  value: string
  label: string
}

export interface SingleChoiceQuestionType {
  id: string
  title: string
  subtitle?: string
  options: SingleChoiceOption[]
}

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType
  onAnswer: (answer: string) => void
  currentAnswer?: string
}

export default function SingleChoiceQuestion({
  question,
  onAnswer,
  currentAnswer,
}: SingleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    currentAnswer || null
  )

  const handleOptionSelect = (option: SingleChoiceOption) => {
    setSelectedOption(option.value)
    onAnswer(option.value)
  }

  return (
    <div className={styles.singleChoiceOptions}>
      {question.options.map((option) => (
        <button
          key={`${question.id}__${option.value}`}
          className={`${styles.singleChoiceOption} ${
            selectedOption === option.value ? styles.selected : ""
          }`}
          onClick={() => handleOptionSelect(option)}
          type="button"
        >
          <div className={styles.optionContent}>
            <input
              type="radio"
              name={`${question.id}__${option.value}`}
              value={option.value}
              className={styles.optionRadio}
              onChange={() => handleOptionSelect(option)}
              checked={selectedOption === option.value}
            />
            <div className={styles.optionLabel}>{option.label}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
