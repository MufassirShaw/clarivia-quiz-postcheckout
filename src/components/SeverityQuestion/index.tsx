"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "./SeverityQuestion.module.css"
import { Loader } from "../Loader"

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
  onAnswer: (answer: number) => Promise<void>
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOptionSelect = async (option: SeverityOption) => {
    setSelectedAnswer(option.value)
    setIsSubmitting(true)
    await onAnswer(option.value)
    setIsSubmitting(false)
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
          {selectedAnswer === option.value && isSubmitting && (
            <div className={styles.optionOverlay}>
              <Loader />
            </div>
          )}
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
