"use client"
import Quiz from "@/components/Quiz"

export default function Home() {
  const handleQuizComplete = (answers: any) => {
    console.log("Quiz completed with answers:", answers)
    // Handle quiz completion - could redirect to results page
  }
  return <Quiz onComplete={handleQuizComplete} />
}
