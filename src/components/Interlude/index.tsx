import { AnswerType, InterludeTypes } from "@/type/quiz"
import { SocialProof } from "./components/SocialProof"
import { LifestylePromise } from "./components/LifestylePromise"
import { NailProfile } from "./components/NailProfile"
import { Timeline } from "./components/Timeline"
import { FinalResults } from "./components/FinalResults"

interface InterludeProps {
  type: InterludeTypes
  handleSubmit: () => void
  answers: Record<string, AnswerType>
}

export const Interlude = ({ handleSubmit, type, answers }: InterludeProps) => {
  if (type === InterludeTypes.SocialProof) {
    return <SocialProof handleSubmit={handleSubmit} />
  }

  if (type === InterludeTypes.LifestylePromise) {
    return <LifestylePromise handleSubmit={handleSubmit} />
  }

  if (type === InterludeTypes.NailProfile) {
    return (
      <NailProfile
        severity={answers.severity as number}
        duration={answers["symptom_duration"] as string}
        handleSubmit={handleSubmit}
      />
    )
  }

  if (type === InterludeTypes.Timeline) {
    return (
      <Timeline
        handleSubmit={handleSubmit}
        severity={answers.severity as number}
      />
    )
  }

  if (type === InterludeTypes.FinalResults) {
    return <FinalResults handleSubmit={handleSubmit} />
  }

  return null
}
