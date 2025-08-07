export enum QuestionType {
  Severity = "severity",
  SingleChoice = "single_choice",
  MultipleChoice = "multiple_choice",
  Text = "text",
  Interlude = "interlude",
}

export enum InterludeTypes {
  SocialProof = "social_proof",
  LifestylePromise = "lifestyle_promise",
  NailProfile = "nail_profile",
  Timeline = "timeline",
}

export type AnswerType = string | number | string[]
