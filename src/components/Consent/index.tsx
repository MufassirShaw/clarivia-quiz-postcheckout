import { ConsentType } from "@/type/quiz"
import { PregnancyConsent } from "./components/PregnancyConsent"
import { TreatmentConsent } from "./components/TreatmentConsent"

interface ConsentProps {
  type: ConsentType
  handleSubmit: (consent: string) => Promise<void>
}

export const Consent = ({ type, handleSubmit }: ConsentProps) => {
  if (type === ConsentType.PregnancyConsent) {
    return <PregnancyConsent handleSubmit={handleSubmit} />
  }
  if (type === ConsentType.TreatmentConsent) {
    return <TreatmentConsent handleSubmit={handleSubmit} />
  }

  return null
}
