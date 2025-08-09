"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import SeverityQuestion, { SeverityQuestionType } from "../SeverityQuestion"
import SingleChoiceQuestion, {
  SingleChoiceQuestionType,
} from "../SingleChoiceQuestion"
import MultipleChoiceQuestion, {
  MultipleChoiceQuestionType,
} from "../MultipleChoiceQuestion"
import TextQuestion from "../TextQuestion"
import { quizData } from "@/utils"
import {
  AnswerType,
  ConsentType,
  InterludeTypes,
  QuestionType,
} from "@/type/quiz"
import styles from "./Quiz.module.css"
import { ProgressBar } from "../ProgressBar"
import { Interlude } from "../Interlude"
import { SelectQuestion } from "../SelectQuestion"
import { BasicInfo } from "../BasicInfo"
import { PersonalInfo } from "../PersonalInfo"
import { Consent } from "../Consent"
import { Modal } from "../Modal"

interface QuizProps {
  onComplete?: (answers: Record<string, AnswerType>) => void
}

const index = 16
export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [hardStopModalOpen, setHardStopModalOpen] = useState(false)

  const currentQuestion = quizData.questions[currentQuestionIndex]

  // Initialize session on first question
  // useEffect(() => {
  //   initializeSession()
  // }, [])

  // const initializeSession = async () => {
  //   try {
  //     setIsLoading(true)
  //     const response = await fetch("/api/sessions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })

  //     if (response.ok) {
  //       const data = await response.json()
  //       console.log("Session initialized:", data)
  //     }
  //   } catch (error) {
  //     console.error("Error initializing session:", error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const submitAnswer = async (questionId: string, answer: any) => {
  //   try {
  //     const response = await fetch(`/api/questions/${questionId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         answer_data: answer,
  //       }),
  //     })

  //     if (response.ok) {
  //       console.log("Answer submitted successfully")
  //     }
  //   } catch (error) {
  //     console.error("Error submitting answer:", error)
  //   }
  // }

  const goToNextQuestion = useCallback(
    (currenAnswers: Record<string, AnswerType>, index: number) => {
      const nextIndex = index + 1

      if (nextIndex >= quizData.questions.length) {
        // TODO: complete the quiz
        return
      }

      const nextQuestion = quizData.questions[nextIndex]

      if (nextQuestion.resolver && !nextQuestion.resolver(currenAnswers)) {
        goToNextQuestion(currenAnswers, nextIndex)
      } else {
        setCurrentQuestionIndex(nextIndex)
      }
    },
    []
  )

  const handleAnswer = useCallback(
    async (answer: AnswerType) => {
      if (currentQuestion?.triggerHardStop?.(answer)) {
        setHardStopModalOpen(true)

        return
      }

      setAnswers((prev) => {
        const newAnswers = {
          ...prev,
          [currentQuestion.id]: answer,
        }
        setTimeout(() => {
          goToNextQuestion(newAnswers, currentQuestionIndex)
        }, 500)
        return newAnswers
      })
    },
    [currentQuestion, goToNextQuestion, currentQuestionIndex]
  )

  // const completeQuiz = async () => {
  //   try {
  //     setIsLoading(true)

  //     // Complete the session
  //     const response = await fetch("/api/sessions/complete", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })

  //     if (response.ok) {
  //       console.log("Quiz completed successfully")
  //       onComplete?.(answers)
  //     }
  //   } catch (error) {
  //     console.error("Error completing quiz:", error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const component = useMemo(() => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case QuestionType.Severity:
        return (
          <SeverityQuestion
            onAnswer={handleAnswer}
            currentAnswer={answers[currentQuestion.id] as number}
            question={currentQuestion as SeverityQuestionType}
          />
        )
      case QuestionType.SingleChoice:
        return (
          <SingleChoiceQuestion
            currentAnswer={answers[currentQuestion.id] as string}
            onAnswer={handleAnswer}
            question={currentQuestion as SingleChoiceQuestionType}
            key={currentQuestion.id}
          />
        )
      case QuestionType.MultipleChoice:
        return (
          <MultipleChoiceQuestion
            currentAnswer={answers[currentQuestion.id] as string[]}
            onAnswer={handleAnswer}
            question={currentQuestion as MultipleChoiceQuestionType}
            key={currentQuestion.id}
          />
        )
      case QuestionType.Text: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { resolver: _, ...rest } = currentQuestion ?? {}
        return (
          <TextQuestion
            {...rest}
            onAnswer={handleAnswer}
            currentAnswer={answers[currentQuestion.id] as string}
            key={currentQuestion.id}
          />
        )
      }

      case QuestionType.Select: {
        return (
          <SelectQuestion
            key={currentQuestion.id}
            options={
              currentQuestion.options as Array<{ name: string; value: string }>
            }
            name={currentQuestion.name}
            label={currentQuestion.label ?? ""}
            placeholder={currentQuestion.placeholder}
            banner={currentQuestion.banner}
            currentAnswer={answers[currentQuestion.id] as string}
            onAnswer={handleAnswer}
            required={currentQuestion.required}
          />
        )
      }
      case QuestionType.Interlude:
        return (
          <Interlude
            handleSubmit={() => {
              goToNextQuestion(answers, currentQuestionIndex)
            }}
            type={currentQuestion.component as InterludeTypes}
            answers={answers}
            key={currentQuestion.id}
          />
        )
      case QuestionType.Basic_Info:
        return (
          <BasicInfo
            onSuccess={() => {
              handleAnswer("")
            }}
            key={currentQuestion.id}
          />
        )

      case QuestionType.Personal_Info:
        return (
          <PersonalInfo
            onSuccess={() => {
              handleAnswer("")
            }}
            key={currentQuestion.id}
          />
        )
      case QuestionType.Consent:
        return (
          <Consent
            type={currentQuestion.consentType as ConsentType}
            handleSubmit={() => {
              goToNextQuestion(answers, currentQuestionIndex)
            }}
            key={currentQuestion.id}
          />
        )
      default:
        return <div>Unknown question type: {currentQuestion.type}</div>
    }
  }, [
    answers,
    currentQuestion,
    handleAnswer,
    goToNextQuestion,
    currentQuestionIndex,
  ])

  const progress = useMemo(() => {
    if (!currentQuestionIndex) {
      return 0
    }

    const totalQuestion = quizData.questions.length
    return ((currentQuestionIndex + 1) / totalQuestion) * 100
  }, [currentQuestionIndex])

  // if (isLoading) {
  //   return (
  //     <div className={styles.quizLoading}>
  //       <div className={styles.loadingSpinner}></div>
  //       <p>Loading...</p>
  //     </div>
  //   )
  // }

  return (
    <>
      <ProgressBar progress={progress} />
      <div className={styles.quizMain}>
        <div className={styles.quizContent} key={currentQuestion?.id}>
          <div
            className={styles.questionWrapper}
            style={{
              backgroundColor:
                currentQuestion?.type === QuestionType.Interlude
                  ? "transparent"
                  : "white",
              boxShadow:
                currentQuestion?.type === QuestionType.Interlude
                  ? "none"
                  : "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className={styles.questionHeader}>
              <h2 className={styles.questionTitle}>{currentQuestion?.title}</h2>
              {currentQuestion?.subtitle && (
                <p className={styles.questionSubtitle}>
                  {currentQuestion?.subtitle}
                </p>
              )}
            </div>
            {component}
          </div>
        </div>
      </div>

      <Modal
        isOpen={hardStopModalOpen}
        onOpenChange={(op) => setHardStopModalOpen(op)}
      />
    </>
  )
}
