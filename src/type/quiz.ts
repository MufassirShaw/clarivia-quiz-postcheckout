export enum ConsentType {
  TreatmentConsent = "treatment_consent",
  PregnancyConsent = "pregnancy_consent",
}

export enum QuestionType {
  Severity = "severity",
  SingleChoice = "single_choice",
  MultipleChoice = "multiple_choice",
  Text = "text",
  Interlude = "interlude",
  Select = "select",
  Consent = "consent",
  Basic_Info = "basic_info", // birth date & email
  Personal_Info = "personal_info", // firstname, lastname & phone
  Med_Selection = "med_selection",
}

export enum InterludeTypes {
  SocialProof = "social_proof",
  LifestylePromise = "lifestyle_promise",
  NailProfile = "nail_profile",
  Timeline = "timeline",
  FinalResults = "final_results",
}

export type AnswerType = string | number | string[]
