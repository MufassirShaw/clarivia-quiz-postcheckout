"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import styles from "./SeverityQuestion.module.css"

interface SeverityOption {
  id: string
  label: string
  image: string
  value: number
}

export interface SeverityQuestionType {
  id: string
  title: string
  subtitle?: string
  options: SeverityOption[]
}
interface SeverityQuestionProps {
  question: SeverityQuestionType
  onAnswer: (answer: number) => void
  currentAnswer?: number
}

export default function SeverityQuestion({
  question,
  onAnswer,
  currentAnswer,
}: SeverityQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    currentAnswer || null
  )

  const handleOptionSelect = (option: SeverityOption) => {
    setSelectedAnswer(option.value)
    onAnswer(option.value)
  }

  return (
    <div className={styles.severityOptions}>
      {question.options.map((option) => (
        <div
          key={option.id}
          className={`${styles.severityOption} ${
            selectedAnswer === option.value ? styles.selected : ""
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
