"use client"

import Image from "next/image"
import styles from "./LifestylePromise.module.css"

export const LifestylePromise = ({
  handleSubmit,
}: {
  handleSubmit: () => void
}) => {
  return (
    <>
      <div className={styles.lifestylePromise}>
        <h2 className={styles.lifestyleHeadline}>
          A busy life shouldn&apos;t stop you from having healthy, beautiful
          nails
        </h2>
        <p className={styles.lifestyleSubheadline}>
          By evaluating your answers in this quiz we&apos;ll be able to create
          your personalized treatment plan to help you achieve clear nails.
        </p>

        <div className={styles.transformationVisual}>
          <div className={styles.beforeAfter}>
            <div className={styles.nailState}>
              <Image
                src="/images/severity/4.png"
                alt="Before"
                width={150}
                height={150}
              />
              <span>Before</span>
            </div>

            <div className={styles.arrow}>→</div>

            <div className={styles.nailState}>
              <Image
                src="/images/severity/1.png"
                alt="After"
                width={150}
                height={150}
              />
              <span>After</span>
            </div>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="primary-button" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </>
  )
}
