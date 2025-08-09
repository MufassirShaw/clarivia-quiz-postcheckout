"use client"
import Quiz from "@/components/Quiz"
import { AnswerType } from "@/type/quiz"

export default function Home() {
  const handleQuizComplete = (answers: Record<string, AnswerType>) => {
    console.log("Quiz completed with answers:", answers)
  }
  return <Quiz onComplete={handleQuizComplete} />
}
