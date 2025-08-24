import { useState } from "react"
import styles from "./faqs.module.css"

export const Faqs = () => {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  const faqData = [
    {
      question: "Who is this for?",
      answer: (
        <>
          <p>
            Clarivia is a prescription topical solution designed for toenail
            fungus (onychomycosis). It is prescribed by licensed U.S. physicians
            through our telehealth platform and is suitable for individuals who
            meet certain criteria related to their condition and treatment
            history. These criteria typically include:
          </p>
          <ol>
            <li>
              Individuals experiencing persistent toenail fungus with noticeable
              signs such as discoloration, thickening, or brittleness of the
              nail.
            </li>
            <li>
              Individuals seeking an effective topical solution, particularly
              those who cannot tolerate or wish to avoid oral antifungal
              medications due to potential side effects or health reasons.
            </li>
            <li>
              Individuals who have previously tried over-the-counter (OTC)
              products, home remedies, or other prescription topicals without
              achieving satisfactory results.
            </li>
          </ol>
        </>
      ),
    },
    {
      question: "How do I know if Clarivia is right for me?",
      answer: (
        <p>
          Clarivia is our advanced topical solution specifically formulated with
          Itraconazole, Terbinafine, and DMSO to target stubborn toenail fungus.
          Determining the most appropriate treatment for nail fungus depends on
          individual factors like the severity of your condition, your health
          history, and treatments you&apos;ve tried before. Clarivia is a
          prescription medication, and it&apos;s not a one-size-fits-all
          solution. During your secure online visit, a licensed U.S. physician
          will carefully review your information to assess if Clarivia is the
          most suitable and safe option tailored to your specific needs.
        </p>
      ),
    },
    {
      question: "How do I qualify for the medication?",
      answer: (
        <p>
          Simply complete our secure online visit, providing details about your
          toenail fungus symptoms and relevant health history. One of our
          U.S.-based licensed physicians will carefully review your information
          to ensure Clarivia is a safe and medically appropriate treatment
          option for your specific situation. If you qualify, the physician will
          issue your prescription.
        </p>
      ),
    },
    {
      question: "Are lab tests required?",
      answer: (
        <p>
          Unlike systemic oral antifungal medications that often require routine
          blood tests (like liver function tests), bloodwork is generally not
          required to be prescribed Clarivia topical solution. However,
          providing recent lab results (if available) during your online visit
          can give the physician a more complete picture of your overall health.
          You will have the option to upload recent bloodwork with your medical
          intake form.
        </p>
      ),
    },
    {
      question: "Do I need insurance?",
      answer: (
        <p>
          No, insurance is not required to use Clarivia&apos;s telehealth
          service or purchase our medication. We offer a direct-pay model
          designed to provide an affordable and accessible prescription
          treatment option, bypassing the insurance complexities and high
          co-pays often associated with other prescription toenail fungus
          solutions.
        </p>
      ),
    },
    {
      question:
        "What if I want to talk to a doctor after I&apos;ve started on the medication?",
      answer: (
        <p>
          Within our secure patient portal, there is a feature allowing you to
          message directly with your assigned physician 24/7.
        </p>
      ),
    },
    {
      question: "What if I am using other toenail fungus medications already?",
      answer: (
        <p>
          We accept patients who are currently using or have recently used other
          treatments for toenail fungus.
        </p>
      ),
    },
    {
      question:
        "Why do I need to provide payment information before I know if I am approved?",
      answer: (
        <p>
          You will not be charged for the medication until a licensed physician
          reviews your information and approves your prescription. Your payment
          information is securely collected at checkout, but the charge is only
          processed once your prescription is approved and sent to our partner
          pharmacy. If you are not approved, you will not be charged.
        </p>
      ),
    },
    {
      question: "How does the subscription work?",
      answer: (
        <p>
          Joining our subscription model allows you to receive your medications
          automatically every month without the need of having to personally
          reorder monthly. Discounts will be available for those on the
          subscription model. Cancel anytime.
        </p>
      ),
    },
    {
      question: "How long until I see results or my nails are clear?",
      answer: (
        <p>
          This will depend on your current condition. Your MD (Medical Doctor)
          will discuss this with you.
        </p>
      ),
    },
    {
      question: "What pharmacies do you work with?",
      answer: (
        <p>
          ChemistryRX
          <br />
          Phone: (877) 817-0843
          <br />
          <a
            href="https://www.chemistryrx.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.chemistryrx.com/
          </a>
          <br />
          950 Henderson Blvd. Folcroft, PA 19032
        </p>
      ),
    },
    {
      question: "What partner medical group do you work with?",
      answer: (
        <p>
          Beluga Health
          <br />
          Phone: (800) 623-5842
          <br />
          <a
            href="https://www.belugahealth.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.belugahealth.com/
          </a>
          <br />
          1321 Upland Dr., Suite 18399, Houston, TX, 77043
        </p>
      ),
    },
    {
      question: "Do you offer a money back guarantee?",
      answer: (
        <p>
          Yes, we offer a 90-day money back guarantee. If you&apos;re not
          satisfied with your results within 90 days of starting treatment, you
          can request a full refund.
        </p>
      ),
    },
    {
      question: "Is this a subscription?",
      answer: (
        <p>
          We understand your concern about not being put on a continuing
          subscription. Our doctors typically prescribe a 12-month treatment
          plan due to the nature of toenail fungus and the time it takes to
          treat effectively. To make this treatment more affordable, we offer
          three flexible payment options — monthly, every 3 months (with a
          discount), or every 6 months (with an even greater discount). All
          plans cover the full 12-month duration of treatment. You may cancel at
          any time if you&apos;re unhappy.
        </p>
      ),
    },
    {
      question: "Is HSA accepted?",
      answer: (
        <p>
          Yes, we accept HSA (Health Savings Account) payments for our
          prescription toenail fungus treatment.
        </p>
      ),
    },
  ]

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Frequently Asked Questions</h3>
        <div className={styles.faqWrapper}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.question}
                onClick={() => toggleItem(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleItem(index)
                  }
                }}
              >
                <h4 className={styles.questionText}>{item.question}</h4>
                <span className={styles.iconWrapper}>
                  {openItem === index ? (
                    <svg
                      className={styles.icon}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className={styles.icon}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div
                className={`${styles.answer} ${
                  openItem === index ? styles.answerOpen : ""
                }`}
              >
                <div className={styles.answerContent}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
