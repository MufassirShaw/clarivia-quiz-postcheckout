import styles from "./modal.module.css"

interface ModalProps {
  isOpen: boolean
  onOpenChange: (op: boolean) => void
  title?: string
  text?: string
  thankYouMessage?: string
  ctaText?: string
}

export type ModalContent = Omit<ModalProps, "isOpen" | "onOpenChange">

export const Modal = ({
  isOpen,
  onOpenChange,
  title = "Unable to Continue",
  text = "Based on your response, we cannot proceed with the medication at this time. Please consult with your doctor for alternative options.",
  thankYouMessage = "Thank you for taking the time to complete this questionnaire.",
  ctaText = "Change Answer",
}: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className={`${styles.modal} ${isOpen && styles.active}`}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{text}</p>
        {thankYouMessage && (
          <p className={styles.thankYou}>{thankYouMessage}</p>
        )}
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => onOpenChange(false)}>
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  )
}
