"use client"

import { useState } from "react"
import styles from "./FormQuestion.module.css"

interface FormField {
  name: string
  type: string
  label: string
  placeholder?: string
  required: boolean
}

interface FormQuestionProps {
  question: {
    id: string
    title: string
    subtitle?: string
    fields: FormField[]
  }
  onAnswer: (answer: { data: Record<string, string> }) => void
  currentAnswer?: { data: Record<string, string> }
}

export default function FormQuestion({
  question,
  onAnswer,
  currentAnswer,
}: FormQuestionProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    currentAnswer?.data || {}
  )

  const handleFieldChange = (fieldName: string, value: string) => {
    const newFormData = { ...formData, [fieldName]: value }
    setFormData(newFormData)
    onAnswer({
      data: newFormData,
    })
  }

  return (
    <div className={styles.formFields}>
      {question.fields.map((field) => (
        <div key={field.name} className={styles.formField}>
          <label htmlFor={field.name} className={styles.fieldLabel}>
            {field.label}
            {field.required && <span className={styles.required}>*</span>}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={styles.formTextarea}
            rows={4}
          />
        </div>
      ))}
    </div>
  )
}
