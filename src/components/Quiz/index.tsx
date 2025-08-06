"use client"

import { useState, useEffect, useMemo } from "react"
import SeverityQuestion from "../SeverityQuestion"
import SingleChoiceQuestion from "../SingleChoiceQuestion"
import MultipleChoiceQuestion from "../MultipleChoiceQuestion"
import FormQuestion from "../FormQuestion"
import { quizData } from "@/utils"
import { QuestionType } from "@/type/quiz"
import styles from "./Quiz.module.css"
import { ProgressBar } from "../ProgressBar"

interface QuizProps {
  onComplete?: (answers: any) => void
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)

  const currentQuestion = quizData.questions[currentQuestionIndex]

  // Initialize session on first question
  useEffect(() => {
    initializeSession()
  }, [])

  const initializeSession = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Session initialized:", data)
      }
    } catch (error) {
      console.error("Error initializing session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async (questionId: string, answer: any) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer_data: answer,
        }),
      })

      if (response.ok) {
        console.log("Answer submitted successfully")
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    }
  }

  const handleAnswer = async (answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))

    await submitAnswer(currentQuestion.id, answer)

    setTimeout(() => {
      nextQuestion()
    }, 500)
  }

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1

    // Check if we should skip this question based on conditions
    if (currentQuestion.showIf) {
      const shouldShow = checkCondition(currentQuestion.showIf)
      if (!shouldShow) {
        setCurrentQuestionIndex(nextIndex)
        return
      }
    }

    if (nextIndex < quizData.questions.length) {
      setCurrentQuestionIndex(nextIndex)
    } else {
      // Quiz completed
      completeQuiz()
    }
  }

  const checkCondition = (conditions: Record<string, any>) => {
    for (const [key, expectedValue] of Object.entries(conditions)) {
      const answer = answers[key]
      if (!answer) return false

      const actualValue = answer.value || answer.values || answer
      if (Array.isArray(actualValue)) {
        if (!actualValue.includes(expectedValue)) return false
      } else {
        if (actualValue !== expectedValue) return false
      }
    }
    return true
  }

  const completeQuiz = async () => {
    try {
      setIsLoading(true)

      // Complete the session
      const response = await fetch("/api/sessions/1/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        console.log("Quiz completed successfully")
        onComplete?.(answers)
      }
    } catch (error) {
      console.error("Error completing quiz:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    const commonProps = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      currentAnswer: answers[currentQuestion.id],
    }

    switch (currentQuestion.type) {
      case QuestionType.Severity:
        return <SeverityQuestion {...commonProps} />
      case QuestionType.SingleChoice:
        return <SingleChoiceQuestion {...commonProps} />
      case QuestionType.MultipleChoice:
        return <MultipleChoiceQuestion {...commonProps} />
      case QuestionType.Form:
        return <FormQuestion {...commonProps} />
      default:
        return <div>Unknown question type: {currentQuestion.type}</div>
    }
  }
  const progress = useMemo(() => {
    if (!quizData.totalQuestions) return 0
    return ((currentQuestionIndex + 1) / quizData.totalQuestions) * 100
  }, [currentQuestionIndex])

  if (isLoading) {
    return (
      <div className={styles.quizLoading}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <ProgressBar progress={progress} />
      <div className={styles.quizMain}>
        <div className={styles.quizContent}>
          <div className={styles.questionWrapper}>
            <div className={styles.questionHeader}>
              <h2 className={styles.questionTitle}>{currentQuestion?.title}</h2>
              {currentQuestion?.subtitle && (
                <p className={styles.questionSubtitle}>
                  {currentQuestion?.subtitle}
                </p>
              )}
            </div>
            {renderQuestion()}
          </div>
        </div>
      </div>
    </>
  )
}
