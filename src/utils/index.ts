import { apiConfig } from "@/config/api"
import {
  AnswerType,
  ConsentType,
  InterludeTypes,
  QuestionType,
} from "@/type/quiz"

const US_STATES = [
  { name: "Alabama", value: "AL" },
  { name: "Alaska", value: "AK" },
  { name: "Arizona", value: "AZ" },
  { name: "Arkansas", value: "AR" },
  { name: "California", value: "CA" },
  { name: "Colorado", value: "CO" },
  { name: "Connecticut", value: "CT" },
  { name: "Delaware", value: "DE" },
  { name: "Florida", value: "FL" },
  { name: "Georgia", value: "GA" },
  { name: "Hawaii", value: "HI" },
  { name: "Idaho", value: "ID" },
  { name: "Illinois", value: "IL" },
  { name: "Indiana", value: "IN" },
  { name: "Iowa", value: "IA" },
  { name: "Kansas", value: "KS" },
  { name: "Kentucky", value: "KY" },
  { name: "Louisiana", value: "LA" },
  { name: "Maine", value: "ME" },
  { name: "Maryland", value: "MD" },
  { name: "Massachusetts", value: "MA" },
  { name: "Michigan", value: "MI" },
  { name: "Minnesota", value: "MN" },
  { name: "Mississippi", value: "MS" },
  { name: "Missouri", value: "MO" },
  { name: "Montana", value: "MT" },
  { name: "Nebraska", value: "NE" },
  { name: "Nevada", value: "NV" },
  { name: "New Hampshire", value: "NH" },
  { name: "New Jersey", value: "NJ" },
  { name: "New Mexico", value: "NM" },
  { name: "New York", value: "NY" },
  { name: "North Carolina", value: "NC" },
  { name: "North Dakota", value: "ND" },
  { name: "Ohio", value: "OH" },
  { name: "Oklahoma", value: "OK" },
  { name: "Oregon", value: "OR" },
  { name: "Pennsylvania", value: "PA" },
  { name: "Rhode Island", value: "RI" },
  { name: "South Carolina", value: "SC" },
  { name: "South Dakota", value: "SD" },
  { name: "Tennessee", value: "TN" },
  { name: "Texas", value: "TX" },
  { name: "Utah", value: "UT" },
  { name: "Vermont", value: "VT" },
  { name: "Virginia", value: "VA" },
  { name: "Washington", value: "WA" },
  { name: "West Virginia", value: "WV" },
  { name: "Wisconsin", value: "WI" },
  { name: "Wyoming", value: "WY" },
]
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
      type: QuestionType.SingleChoice,
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
      type: QuestionType.Text,
      title: "Tell us more about your nail symptoms",
      placeholder: "Describe your symptoms...",
      required: true,
      label: "Please describe your nail symptoms",
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
    // Marketing Page 1: Social Proof
    {
      id: "social_proof",
      type: QuestionType.Interlude,
      component: InterludeTypes.SocialProof,
      data: {
        topline: "Looks like you're a good fit",
        headline: "3,700 people just like you",
        subheadline: "have chosen Clarivia",
        avatars: true,
      },
    },
    // Question 5: Previous Diagnosis
    {
      id: "previous_diagnosis",
      type: QuestionType.SingleChoice,
      title:
        "Have you been previously diagnosed with nail fungus by a healthcare professional?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },

    // Question 6: Previous Treatments
    {
      id: "previous_treatments",
      type: QuestionType.SingleChoice,
      title: "Have you used any products/treatments on your nails?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },

    // Question 7: Treatment Details (conditional)
    {
      id: "treatment_details",
      type: QuestionType.Text,
      title: "Please describe your previous treatments",
      subtitle: "Optional - you can skip this",
      label: "Treatment details (optional)",
      placeholder: 'Share any details or type "skip"',
      required: false,
      resolver: (answers: Record<string, AnswerType>) =>
        answers["previous_treatments"] === "Yes",
    },

    // Question 8: Other Symptoms
    {
      id: "other_symptoms",
      type: QuestionType.MultipleChoice,
      title: "Have you experienced any of the following?",
      subtitle: "These help us ensure proper treatment",
      options: [
        {
          value: "redness_swelling",
          label: "Redness/swelling around the nail(s)",
        },
        { value: "pain", label: "Pain of the affected nail/toe(s)" },
        { value: "bleeding", label: "Bleeding of the affected nail" },
        { value: "pus", label: "Pus or drainage from the nail(s) " },
        {
          value: "dark_color",
          label: "Dark black color of the nail bed or surrounding skin",
        },
        {
          value: "rash",
          label: "Rash on the skin surrounding the affected nail ",
        },
        {
          value: "growth",
          label: "New bump/nodule/growth under the nail or on toe",
        },
        { value: "none", label: "None of the above" },
      ],
    },
    // Question 8a: Additional Nail Symptoms Details
    {
      id: "additional_symptoms",
      type: QuestionType.Text,
      title: "Please provide any additional details about your nail symptoms",
      subtitle: "Optional - you can skip this",
      required: false,
      label: "Additional details (optional)",
      placeholder: "Share any other symptoms or leave blank",
      resolver: (answers: Record<string, AnswerType>) =>
        answers["nail_concerns"] === "Other nail symptom",
    },
    // Marketing Page 2: Lifestyle Promise
    {
      id: "lifestyle_promise",
      type: QuestionType.Interlude,
      component: InterludeTypes.LifestylePromise,
      data: {
        headline:
          "A busy life shouldn't stop you from having healthy, beautiful nails",
        subheadline:
          "By evaluating your answers in this quiz we'll be able to create your personalized treatment plan to help you achieve clear nails",
        image: "transformation",
      },
    },

    // Question 9: Medical Conditions
    {
      id: "medical_conditions",
      type: QuestionType.Text,
      title: "Please list your current medical conditions",
      subtitle: "Optional - helps ensure safe treatment",
      name: "conditions",
      label: "Medical conditions (optional)",
      placeholder: "List conditions or skip",
      required: false,
    },

    // Question 10: Current Medications
    {
      id: "current_medications",
      type: QuestionType.Text,
      title: "Please list all current medications",
      subtitle: "Optional - include dosages if known",
      name: "medications",
      label: "Current medications (optional)",
      placeholder: "List medications or skip",
      required: false,
    },

    // Question 10a: Last Physician Check-up
    {
      id: "last_checkup",
      type: QuestionType.SingleChoice,
      title: "How long ago was your most recent check up with a physician?",
      options: [
        { value: "within_year", label: "Within past year" },
        { value: "within_2_years", label: "Within 2 years" },
        { value: "3_5_years", label: "Within 3-5 years" },
        { value: "over_5_years", label: "Over 5 years ago" },
      ],
    },

    // Question 11: Allergies
    {
      id: "allergies",
      type: QuestionType.Text,
      title: "Please list all known allergies",
      subtitle: "Optional",
      name: "allergies",
      label: "Allergies (optional)",
      placeholder: "List allergies or skip",
      required: false,
    },

    // Marketing Page 3: Nail Health Profile
    {
      id: "nail_profile",
      type: QuestionType.Interlude,
      component: InterludeTypes.NailProfile,
      data: {
        title: "Summary of your Nail Health Profile",
      },
    },

    // Question 12: Liver/Kidney Disease
    {
      id: "liver_kidney_disease",
      type: QuestionType.SingleChoice,
      title: "Do you have known liver or kidney disease?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },

    // Question 12a: Liver/Kidney Disease Details (conditional - shows when yes)
    {
      id: "liver_kidney_details",
      type: QuestionType.Text,
      title: "Please provide further information about this condition",
      resolver: (answers: Record<string, AnswerType>) =>
        answers["liver_kidney_disease"] === "Yes",
      name: "details",
      label: "Condition details",
      placeholder: "Please describe your liver or kidney condition",
      required: true,
    },
    // Question 13: Medication Interactions
    {
      id: "medication_interactions",
      type: QuestionType.MultipleChoice,
      title: "Are you currently taking any of these medications?",
      subtitle: "Check all that apply",
      triggerHardStop: (answers: AnswerType) =>
        !(answers as string[]).includes("None"),
      options: [
        { value: "terbinafine", label: "Terbinafine or naftifine" },
        {
          value: "azole",
          label:
            "Antifungal medications ending in “-azole” (e.g., fluconazole)",
        },
        {
          value: "terfenadine",
          label: "Terfenadine, Cisapride, Astemizole, or Erythromycin",
        },
        { value: "pimozide", label: "Pimozide, Quinidine, or Lemborexant" },
        { value: "amiodarone", label: "Amiodarone" },
        {
          value: "tricyclics",
          label: "Tricyclic antidepressants (e.g., amitriptyline)",
        },
        { value: "ssris", label: "SSRIs (e.g., fluoxetine)" },
        { value: "maois", label: "MAOIs (e.g., rasagiline)" },
        { value: "beta_blockers", label: "Beta-blockers (e.g., metoprolol)" },
        {
          value: "antiarrhythmics",
          label: "Antiarrhythmics (e.g., flecainide)",
        },
        { value: "cimetidine", label: "Cimetidine, Dextromethorphan" },
        { value: "blood_thinners", label: "Blood thinners (e.g., warfarin)" },
        { value: "none", label: "None" },
      ],
    },
    // Marketing Page 4: Timeline
    {
      id: "timeline",
      type: QuestionType.Interlude,
      component: InterludeTypes.Timeline,
    },
    {
      id: "final_results",
      type: QuestionType.Interlude,
      component: InterludeTypes.FinalResults,
    },
    {
      id: "state",
      type: QuestionType.Select,
      title: "Let's verify treatment availability",
      subtitle: "Clarivia is available in all 50 states",
      banner:
        "🎉 Great news! Based on your answers, you're an excellent candidate for our prescription treatment",
      name: "state",
      label: "Your State",
      required: true,
      options: US_STATES,
    },
    {
      id: "basic_info",
      type: QuestionType.Basic_Info,
      title: "Please provide your information",
      subtitle: "Your information is 100% secure",
    },
    // Question 16: Sex at Birth
    {
      id: "sex_at_birth",
      type: QuestionType.SingleChoice,
      title: "What was your sex assigned at birth?",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },

    // Question 17: Pregnancy Status (conditional - shows only if female selected)
    {
      id: "pregnancy_status",
      type: QuestionType.SingleChoice,
      title:
        "Are you currently pregnant, breastfeeding or planning to become pregnant?",
      triggerHardStop: (answer: AnswerType) => answer === "Yes",
      resolver: (answers: Record<string, AnswerType>) =>
        answers["sex_at_birth"] === "Female",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      id: "pregnancy_consent",
      type: QuestionType.Consent,
      consentType: ConsentType.PregnancyConsent,
      title: "Consent (Pregnancy)",
      resolver: (answers: Record<string, AnswerType>) =>
        answers["sex_at_birth"] === "Female" &&
        answers["pregnancy_status"] === "No",
    },
    {
      id: "personal_info",
      type: QuestionType.Personal_Info,
      title: "Please introduce yourself to the doctor",
    },
    // Question 19: Specific Concerns
    {
      id: "specific_concerns",
      type: QuestionType.SingleChoice,
      title:
        "Do you have any specific concerns or questions about this treatment or would you like to provide more information to the medical team?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      id: "concerns_details",

      type: QuestionType.Text,
      title: "Please share your concerns or questions",
      name: "concerns_details",
      label: "Your concerns or questions",
      placeholder: "Please describe your concerns or questions",
      required: true,
      resolver: (answers: Record<string, AnswerType>) =>
        answers["specific_concerns"] === "Yes",
    },
    // Question 20: Comprehensive Treatment Consent
    {
      id: "treatment_consent",
      type: QuestionType.Consent,
      title: "Consent (Nail Fungus Treatment)",
      consentType: ConsentType.TreatmentConsent,
      isLast: true,
    },
  ],
}

const prodQuestionMap: Record<string, number | null> = {
  severity: null, // No direct mapping, used for initialization
  basic_info: null, // Multiple fields, handled specially
  personal_info: null, // Multiple fields, handled specially

  sex_at_birth: 1301,
  pregnancy_status: 1302,
  pregnancy_consent: 1303,
  medical_conditions: 1304,
  current_medications: 1305,
  allergies: 1306,
  last_checkup: 1307,
  nail_concerns: 1308,
  nail_symptoms_details: 1309,
  affected_nails: 1310,
  symptom_duration: 1311,
  other_symptoms: 1312,
  additional_symptoms: 1313,
  previous_diagnosis: 1314,
  previous_treatments: 1315,
  treatment_details: 1316,
  liver_kidney_disease: 1317,
  liver_kidney_details: 1318,
  medication_interactions: 1319,
  specific_concerns: 1320,
  concerns_details: 1321,
  treatment_consent: 1322,
}

// update
const devQuestionMap: Record<string, number | null> = {
  severity: null, // No direct mapping, used for initialization
  basic_info: null, // Multiple fields, handled specially
  personal_info: null, // Multiple fields, handled specially

  sex_at_birth: 1300901,
  pregnancy_status: 1300902,
  pregnancy_consent: 1300903,
  medical_conditions: 1300904,
  current_medications: 1300905,
  allergies: 1300906,
  last_checkup: 1300907,
  nail_concerns: 1300908,
  nail_symptoms_details: 1300909,
  affected_nails: 1300910,
  symptom_duration: 1300911,
  other_symptoms: 1300912,
  additional_symptoms: 1300913,
  previous_diagnosis: 1300914,
  previous_treatments: 1300915,
  treatment_details: 1300916,
  liver_kidney_disease: 1300917,
  liver_kidney_details: 1300918,
  medication_interactions: 1300919,
  specific_concerns: 1300920,
  concerns_details: 1300921,
  treatment_consent: 1300922,
}

export const getDosableId = (id: string) => {
  if (apiConfig.isProduction) {
    return prodQuestionMap[id]
  }
  return devQuestionMap[id]
}
