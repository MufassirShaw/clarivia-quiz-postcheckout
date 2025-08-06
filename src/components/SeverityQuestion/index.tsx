"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "./SeverityQuestion.module.css"

interface SeverityOption {
  id: string
  label: string
  image: string
  value: number
}

interface SeverityQuestionProps {
  question: {
    id: string
    title: string
    subtitle?: string
    options: SeverityOption[]
  }
  onAnswer: (answer: any) => void
  currentAnswer?: any
}

export default function SeverityQuestion({
  question,
  onAnswer,
  currentAnswer,
}: SeverityQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    currentAnswer?.value?.toString() || null
  )

  const handleOptionSelect = (option: SeverityOption) => {
    setSelectedOption(option.id)
    onAnswer({
      value: option.value,
      label: option.label,
      id: option.id,
    })
  }

  return (
    <div className={styles.severityOptions}>
      {question.options.map((option) => (
        <div
          key={option.id}
          className={`${styles.severityOption} ${
            selectedOption === option.id ? styles.selected : ""
          }`}
          onClick={() => handleOptionSelect(option)}
        >
          <Image
            src={option.image}
            alt={option.label}
            width={200}
            height={200}
            className={styles.severityImage}
          />
          <div className={styles.severityLabel}>{option.label}</div>
        </div>
      ))}
    </div>
  )
}
