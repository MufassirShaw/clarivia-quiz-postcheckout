import styles from "./howItWorks.module.css"
import Image from "next/image"

interface ProcessStepProps {
  icon: string
  title: string
  description: string
  stepNumber: number
  showLine?: boolean
}

function ProcessStep({ icon, title, description, showLine }: ProcessStepProps) {
  return (
    <div className={`${styles.column} ${showLine ? styles.separator : ""}`}>
      <div className={styles.stepContainer}>
        <Image
          src={icon}
          alt={title}
          width={100}
          height={100}
          className={styles.stepIcon}
        />
        <h5 className={styles.stepTitle}>{title}</h5>
        <p className={styles.stepDescription}>{description}</p>
      </div>
    </div>
  )
}

const processSteps = [
  {
    icon: "/images/process1.webp",
    title: "Intake Form (Already Completed)",
    description:
      "The Intake Form Is Already Completed And You Are A Good Candidate For Clarivia.",
    stepNumber: 1,
  },
  {
    icon: "/images/process2.webp",
    title: "Custom Formulation",
    description:
      "Your Itraconazole + Terbinafine Prescription Customized For Your Symptoms.",
    stepNumber: 2,
    showLine: true,
  },
  {
    icon: "/images/process3.webp",
    title: "Get Your Meds",
    description:
      "One of our U.S. doctors will review your application, then send your prescription to one of our U.S. Pharmacies who will ship it to you.",
    stepNumber: 3,
  },
]

export const HowItWorks = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h3 className={styles.mainTitle}>How It Works</h3>

        <div className={styles.stepsRow}>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={`step-${index}`}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={step.stepNumber}
              showLine={step.showLine}
            />
          ))}
        </div>

        <h3 className={styles.tagline}>
          <em>&quot;Click Below To Choose Your Package&quot;</em>
        </h3>
        <a
          href="#bottle-options"
          className={`buy-now-button ${styles.buyButton}`}
        >
          Buy Now
        </a>
      </div>
    </section>
  )
}
