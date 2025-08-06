import { QuestionType } from "@/type/quiz"

// Import quiz data
export const quizData = {
  totalQuestions: 26,
  questions: [
    // Question 1: Visual Severity Selector (Hook)
    {
      id: "severity",
      type: QuestionType.Severity,
      title: "Which best matches your nail condition?",
      subtitle: "Select the image that most closely resembles your nails",
      options: [
        {
          id: "mild",
          label: "Mild Discoloration",
          image: "/images/severity/1.png",
          value: 1,
        },
        {
          id: "moderate",
          label: "Moderate Yellowing",
          image: "/images/severity/2.png",
          value: 2,
        },
        {
          id: "significant",
          label: "Significant Damage",
          image: "/images/severity/3.png",
          value: 3,
        },
        {
          id: "severe",
          label: "Severe Condition",
          image: "/images/severity/4.png",
          value: 4,
        },
      ],
    },
    // Question 2: Duration
    {
      id: "symptom_duration",
      type: QuestionType.SingleChoice,
      title: "How long have you been experiencing these symptoms?",
      options: [
        { value: "less_3_months", label: "Less than 3 months" },
        { value: "3_6_months", label: "3-6 months" },
        { value: "6_12_months", label: "6-12 months" },
        { value: "over_12_months", label: "More than 12 months" },
      ],
    },
    // Question 3: Nail Concerns
    {
      id: "nail_concerns",
      type: QuestionType.MultipleChoice,
      title: "What nail concerns are you experiencing?",
      subtitle: "Select all that apply",
      options: [
        { value: "thickening", label: "Thickening of the nail" },
        { value: "discoloration", label: "Discoloration" },
        { value: "shape_change", label: "Change in nail shape" },
        { value: "loosening", label: "Loosening/lifting of nail" },
        { value: "brittleness", label: "Brittleness" },
        { value: "crumbling", label: "Crumbling of nail edges" },
        { value: "other", label: "Other nail symptom" },
      ],
    },
    // Question 3a: Tell us more about nail symptoms (conditional)
    {
      id: "nail_symptoms_details",
      type: QuestionType.Form,
      title: "Tell us more about your nail symptoms",
      showIf: { nail_concerns: "other" },
      fields: [
        {
          name: "details",
          type: "textarea",
          label: "Please describe your nail symptoms",
          placeholder: "Describe your symptoms...",
          required: true,
        },
      ],
    },
    // Question 4: Affected Nails
    {
      id: "affected_nails",
      type: QuestionType.MultipleChoice,
      title: "What nail(s) are affected?",
      subtitle: "Select all that apply",
      options: [
        { value: "One toenail", label: "One toenail" },
        { value: "More than one toenail", label: "More than one toenail" },
        { value: "All toenails", label: "All toenails" },
        { value: "One fingernail", label: "One fingernail" },
        {
          value: "More than one fingernail",
          label: "More than one fingernail",
        },
        {
          value: "Fingernails and toenails are affected",
          label: "Fingernails and toenails are affected",
        },
      ],
    },
  ],
}
