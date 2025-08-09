import { useState } from "react"
import styles from "./pregnancyConsent.module.css"

interface PregnancyConsentProps {
  handleSubmit: (answer: string) => Promise<void>
}

const consent =
  "I have read and understand the above information, I understand the risks and wish to proceed"

export const PregnancyConsent = ({ handleSubmit }: PregnancyConsentProps) => {
  const [hasRead, setHasRead] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAccept = async () => {
    setIsSubmitting(true)
    await handleSubmit(consent)
    setIsSubmitting(true)
  }

  return (
    <>
      <div className={styles.consentContent}>
        I understand that the medication prescribed to me by my healthcare
        provider may not be safe to take during pregnancy. I acknowledge that
        taking this medication while pregnant could pose risks to my health and
        the health of a developing fetus. I agree to take necessary precautions
        to avoid becoming pregnant while using this medication, including the
        use of effective contraception methods. By selecting below, I confirm
        that I have read and understand the information provided above. I
        consent to proceed with the treatment under these conditions.
      </div>

      <div className={styles.consentCheckbox}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            id="consentCheck"
            className={styles.consentCheck}
            onChange={(e) => setHasRead(e.target.checked)}
            checked={hasRead}
          />
          <span>{consent}</span>
        </label>
      </div>
      <div className="button-container">
        <button
          className="primary-button"
          disabled={!hasRead || isSubmitting}
          onClick={handleAccept}
        >
          I Agree & Continue
        </button>
      </div>
    </>
  )
}
