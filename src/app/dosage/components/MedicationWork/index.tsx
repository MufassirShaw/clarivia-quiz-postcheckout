import Image from "next/image"
import styles from "./medicationWork.module.css"

export const MedicationWork = () => {
  return (
    <div className={`container ${styles.mainContainer}`}>
      <Image
        src="/images/phone(2).webp"
        alt="phone image"
        height={420}
        width={420}
      />
      <article className={styles.textContent}>
        <h3>
          How Does Clarivia&rsquo;s <br /> <span>Medication Work?</span>
        </h3>
        <p>
          Stubborn toenail fungus (onychomycosis) lives deep within and under
          the nail plate, making it notoriously difficult to treat. Standard
          creams often can&rsquo;t penetrate effectively. Clarivia is designed
          differently:
          <br />
          <br />
          Itraconazole and Terbinafine are powerful prescription agents that
          attack the fungal cells causing the infection through multiple
          mechanisms. DMSO acts like a key, unlocking the nail plate&rsquo;s
          barrier to allow the antifungals to travel deeper and reach the fungus
          where it thrives. By focusing treatment directly on the nail, Clarivia
          aims to maximize effectiveness at the site of infection while
          minimizing the systemic exposure associated with oral medications.*
        </p>
      </article>
    </div>
  )
}
