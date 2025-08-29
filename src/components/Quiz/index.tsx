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
import { useRouter } from "next/navigation"

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({})
  const [hardStopModalOpen, setHardStopModalOpen] = useState(false)
  const [leadState, setLeadState] = useState("")

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const router = useRouter()

  const saveAnswerToDosable = useCallback(
    async ({
      qid,
      answer,
      question,
    }: {
      qid: number
      answer: AnswerType
      question: string
    }) => {
      const response = await fetch(`/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [qid]: {
            value: answer,
            question,
          },
        }),
      })

      if (!response.ok) {
        throw Error(response.statusText)
      }
    },
    []
  )

  const transformAnswers = useCallback(
    (quizAnswers: Record<string, AnswerType>) => {
      let transformed: Record<string, { value: string; question: string }> = {}

      Object.entries(quizAnswers).forEach(([key, value]) => {
        const dosableQId = getDosableId(key)
        const question = quizData.questions.find((q) => q.id === key)
        if (dosableQId && question) {
          transformed = {
            ...transformed,
            [dosableQId]: {
              value,
              question: question.title,
            },
          }
        }
      })
      return transformed
    },
    []
  )

  const saveAnswers = useCallback(
    async (quizAnswers: Record<string, AnswerType>) => {
      const transformedAnswers = transformAnswers(quizAnswers)

      for (const key of Object.keys(transformedAnswers)) {
        const answer = transformedAnswers[key]
        await saveAnswerToDosable({
          qid: Number(key),
          answer: answer.value,
          question: answer.question,
        })
      }
    },
    [saveAnswerToDosable, transformAnswers]
  )

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
        if (currentQuestion.isLast) {
          await saveAnswers({ ...answers, [currentQuestion.id]: answer })

          const currentUrl = new URL(window.location.href)
          const dosageUrl = new URL("/dosage", window.location.origin)

          currentUrl.searchParams.forEach((value, key) => {
            dosageUrl.searchParams.set(key, value)
          })

          router.push(dosageUrl.pathname + dosageUrl.search)
          return
        }

        setAnswers((prev) => {
          const newAnswers = {
            ...prev,
            [currentQuestion.id]: answer,
          }
          goToNextQuestion(newAnswers, currentQuestionIndex)
          return newAnswers
        })
      } catch (error) {
        console.log(error)
        toast.error("Opps! Something went wrong")
      }
    },
    [
      currentQuestion,
      saveAnswers,
      answers,
      router,
      goToNextQuestion,
      currentQuestionIndex,
    ]
  )

  const saveLeadToDosable = useCallback(
    async (lead: Partial<ILead>) => {
      try {
        const response = await fetch(`/api/leads`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...lead,
            gender: answers["sex_at_birth"] ?? "Male",
          }),
        })

        if (!response.ok) {
          throw Error(response.statusText)
        }
        goToNextQuestion(answers, currentQuestionIndex)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error(
          "Something went wrong, please try a different email and/or phone number"
        )
      }
    },
    [answers, goToNextQuestion, currentQuestionIndex]
  )

  const createLead = useCallback(
    async (lead: Partial<ILead>) => {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...lead,
            lead_state: leadState,
          }),
        })

        if (response.ok) {
          goToNextQuestion(answers, currentQuestionIndex)
          return
        }

        throw Error(response.statusText)
      } catch (error) {
        toast.error("Opps! something went wrong")
        console.error("Error initializing session:", error)
      }
    },
    [answers, currentQuestionIndex, goToNextQuestion, leadState]
  )

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
            onAnswer={async (lead) => {
              setLeadState(lead.lead_state ?? "")
              goToNextQuestion(answers, currentQuestionIndex)
            }}
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
      case QuestionType.Personal_Info:
        return (
          <PersonalInfo onAnswer={saveLeadToDosable} key={currentQuestion.id} />
        )

      case QuestionType.Basic_Info:
        return <BasicInfo onAnswer={createLead} key={currentQuestion.id} />

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
    handleAnswer,
    answers,
    saveLeadToDosable,
    createLead,
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

  return (
    <>
      <ProgressBar progress={progress} />
      <div className={styles.quizMain}>
        <div className={styles.quizContent} key={currentQuestion?.id}>
          <div
            className={styles.questionWrapper}
            style={{
              backgroundColor: [
                QuestionType.Interlude,
                QuestionType.Med_Selection,
              ].includes(currentQuestion?.type)
                ? "transparent"
                : "white",
              boxShadow: [
                QuestionType.Interlude,
                QuestionType.Med_Selection,
              ].includes(currentQuestion?.type)
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
