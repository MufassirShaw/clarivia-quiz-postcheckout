import { useEffect, useRef, useState } from "react"
import styles from "./treatmentConsent.module.css"
import { Loader } from "@/components/Loader"

const consent =
  "I have read and understand the information and I wish to continue"

export const TreatmentConsent = ({
  handleSubmit,
}: {
  handleSubmit: (answer: string) => Promise<void>
}) => {
  const [hasRead, setHasRead] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLButtonElement>(null)
  const handleAccept = async () => {
    setIsSubmitting(true)
    await handleSubmit(consent)
    setIsSubmitting(false)
  }
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <>
      <div className={styles.consentContent}>
        <div style={{ paddingRight: "10px" }}>
          <h4>Introduction</h4>
          <p>
            You have been diagnosed with onychomycosis (nail fungus), a common
            fungal infection of the nails that can cause discoloration,
            thickening, brittleness, and separation of the nail from the nail
            bed. This condition is often caused by dermatophytes, yeasts, or
            molds. Onychomycosis can affect both fingernails and toenails and
            may result in discomfort, pain, or cosmetic concerns if left
            untreated.
          </p>

          <h4>Purpose of Treatment</h4>
          <p>
            The goal of nail fungus treatment is to eradicate the fungal
            infection, restore the health and appearance of the nails, and
            prevent recurrence. Treatment plans are personalized and may include
            topical or oral medications, and preventive strategies based on the
            severity and type of infection.
          </p>

          <h4>Treatment Options</h4>
          <p>
            <strong>Topical Antifungal Medications:</strong>
          </p>
          <ul>
            <li>Ciclopirox</li>
            <li>Efinaconazole</li>
            <li>Tavaborole</li>
            <li>Other combinations of therapy</li>
          </ul>
          <p>
            <strong>Oral Antifungal Medications:</strong>
          </p>
          <ul>
            <li>Terbinafine</li>
            <li>Itraconazole</li>
            <li>Fluconazole</li>
            <li>Other combinations of therapy</li>
          </ul>
          <p>
            <strong>Preventive Measures:</strong>
          </p>
          <ul>
            <li>Keeping nails clean and dry.</li>
            <li>Avoiding tight-fitting shoes.</li>
            <li>Using antifungal powders or sprays.</li>
          </ul>

          <h4>Potential Benefits</h4>
          <ul>
            <li>Elimination of the fungal infection.</li>
            <li>Improved nail appearance, texture, and integrity.</li>
            <li>Reduction in discomfort or pain caused by the infection.</li>
            <li>
              Prevention of recurrence with proper care and adherence to
              preventive measures.
            </li>
          </ul>

          <h4>Potential Risks and Side Effects</h4>
          <p>
            <strong>Topical Medications:</strong>
          </p>
          <ul>
            <li>Skin irritation, redness, or peeling around the nails.</li>
            <li>Allergic reactions to the medication.</li>
          </ul>
          <p>
            <strong>Oral Medications:</strong>
          </p>
          <ul>
            <li>Nausea, stomach upset, or headaches.</li>
            <li>
              Liver toxicity or elevated liver enzymes (rare but serious).
            </li>
            <li>Interaction with other medications or supplements.</li>
          </ul>
          <p>
            <strong>General Risks:</strong>
          </p>
          <ul>
            <li>
              Ineffectiveness of treatment, requiring alternative approaches.
            </li>
            <li>
              Recurrence of the infection if preventive measures are not
              followed.
            </li>
            <li>Psychological impact if desired results are not achieved.</li>
          </ul>

          <h4>Pregnancy and Breastfeeding Precautions</h4>
          <p>
            Some antifungal medications may not be safe during pregnancy or
            breastfeeding. Inform your healthcare provider if you are pregnant,
            planning to become pregnant, or breastfeeding.
          </p>

          <h4>Patient Responsibilities</h4>
          <ul>
            <li>
              <strong>Medical Disclosure:</strong> Inform your provider of all
              medications, supplements, allergies, and medical conditions,
              including pregnancy or breastfeeding status.
            </li>
            <li>
              <strong>Treatment Adherence:</strong> Follow the prescribed
              treatment regimen and application instructions exactly as
              directed.
            </li>
            <li>
              <strong>Appointments:</strong> Attend all scheduled follow-up
              visits to assess progress and adjust treatment as needed.
            </li>
            <li>
              <strong>Communication:</strong> Report any side effects, adverse
              reactions, or concerns promptly.
            </li>
            <li>
              <strong>Nail Care:</strong> Maintain proper nail hygiene and avoid
              trauma or moisture exposure to enhance treatment effectiveness.
            </li>
          </ul>

          <h4>Alternative Treatments</h4>
          <ul>
            <li>
              <strong>Over-the-Counter Products:</strong> Non-prescription
              antifungal creams or nail lacquers.
            </li>
            <li>
              <strong>Natural Remedies:</strong> Tea tree oil, vinegar soaks, or
              other home remedies (efficacy may vary).
            </li>
            <li>
              <strong>No Treatment:</strong> Choosing not to pursue treatment,
              understanding the potential progression of the infection.
            </li>
          </ul>

          <h4>Acknowledgment and Consent</h4>
          <p>By selecting below, you acknowledge that:</p>
          <ul>
            <li>
              You have been informed about your diagnosis and the proposed
              treatment options for nail fungus.
            </li>
            <li>
              You understand the potential benefits, risks, and side effects
              associated with the treatment.
            </li>
            <li>
              You agree to inform your healthcare provider of any changes in
              your health or reactions to the treatment.
            </li>
            <li>
              You commit to following the treatment plan and preventive measures
              provided.
            </li>
            <li>
              You consent to proceed with the recommended treatment plan,
              understanding that you may withdraw consent or discontinue
              treatment at any time.
            </li>
          </ul>
        </div>
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
          <span>
            I have read and understand the information and I wish to continue
          </span>
        </label>
      </div>
      <div className="button-container">
        <button
          className="primary-button"
          disabled={!hasRead || isSubmitting}
          onClick={handleAccept}
          ref={containerRef}
        >
          {isSubmitting && <Loader />}I Agree & Continue
        </button>
      </div>
    </>
  )
}
