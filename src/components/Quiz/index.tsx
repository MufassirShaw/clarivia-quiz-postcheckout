"use client"

import { useState, useMemo, useCallback } from "react"
import SeverityQuestion, { SeverityQuestionType } from "../SeverityQuestion"
import SingleChoiceQuestion, {
  SingleChoiceQuestionType,
} from "../SingleChoiceQuestion"
import MultipleChoiceQuestion, {
  MultipleChoiceQuestionType,
} from "../MultipleChoiceQuestion"
import TextQuestion from "../TextQuestion"
import { getDosableId, quizData } from "@/utils"
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
import { toast } from "react-toastify"
import { ILead } from "@/type/lead"

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({})
  const [hardStopModalOpen, setHardStopModalOpen] = useState(false)

  const currentQuestion = quizData.questions[currentQuestionIndex]

  const saveAnswerToDosable = useCallback(
    async ({ qid, answer }: { qid: number; answer: AnswerType }) => {
      const response = await fetch(`/api/questions/${qid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [qid]: {
            value: answer,
            question: currentQuestion.title,
          },
        }),
      })

      if (!response.ok) {
        throw Error(response.statusText)
      }
    },
    [currentQuestion]
  )

  const completeSession = useCallback(async () => {
    const response = await fetch(`/api/session/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw Error(response.statusText)
    }
  }, [])

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

      try {
        const dosableQId = getDosableId(currentQuestion.id)

        if (dosableQId) {
          await saveAnswerToDosable({ qid: dosableQId, answer })
        }

        if (currentQuestion.isLast && dosableQId) {
          await completeSession()
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
      } catch (error) {
        console.log(error)
        toast.error("Opps! Something went wrong")
      }
    },
    [
      currentQuestion,
      goToNextQuestion,
      currentQuestionIndex,
      saveAnswerToDosable,
      completeSession,
    ]
  )

  const updateLead = useCallback(
    async (lead: Partial<ILead>) => {
      const response = await fetch(`/api/leads`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      })

      if (!response.ok) {
        throw Error(response.statusText)
      }

      goToNextQuestion(answers, currentQuestionIndex)
    },
    [answers, currentQuestionIndex, goToNextQuestion]
  )

  const initializeQuiz = useCallback(
    async (answer: AnswerType) => {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          handleAnswer(answer)
          return
        }

        throw Error(response.statusText)
      } catch (error) {
        toast.error("Opps! something went wrong")
        console.error("Error initializing session:", error)
      }
    },
    [handleAnswer]
  )

  const component = useMemo(() => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case QuestionType.Severity:
        return (
          <SeverityQuestion
            onAnswer={initializeQuiz}
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
        /**
         * This is only used for lead.state atm
         * Needs to be refactored if we get another select type question
         */
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
            onAnswer={updateLead}
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
        return <BasicInfo onAnswer={updateLead} key={currentQuestion.id} />

      case QuestionType.Personal_Info:
        return (
          <PersonalInfo
            onAnswer={(d) =>
              updateLead({ ...d, gender: answers["sex_at_birth"] as string })
            }
            key={currentQuestion.id}
          />
        )
      case QuestionType.Consent:
        return (
          <Consent
            type={currentQuestion.consentType as ConsentType}
            handleSubmit={handleAnswer}
            key={currentQuestion.id}
          />
        )
      default:
        return <div>Unknown question type: {currentQuestion.type}</div>
    }
  }, [
    currentQuestion,
    initializeQuiz,
    answers,
    handleAnswer,
    updateLead,
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
