"use client"

import Image from "next/image"
import styles from "./SocialProof.module.css"

const avatarImages = [
  "ChatGPT Image Jul 14, 2025, 10_15_01 AM.png",
  "ChatGPT Image Jul 14, 2025, 10_15_10 AM.png",
  "ChatGPT Image Jul 14, 2025, 10_15_38 AM.png",
  "ChatGPT Image Jul 14, 2025, 10_15_50 AM.png",
  "ChatGPT Image Jul 14, 2025, 10_16_48 AM.png", // featured
  "ChatGPT Image Jul 14, 2025, 10_16_10 AM.png",
  "ChatGPT Image Jul 14, 2025, 10_16_26 AM.png",
  "ChatGPT Image Jul 14, 2025, 10_16_34 AM.png",
  "ChatGPT Image Jul 14, 2025, 10_17_00 AM.png",
]

export const SocialProof = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <>
      <div className={styles.socialProofPage}>
        <p className={styles.socialProofTopline}>
          Looks like you&apos;re a good fit
        </p>
        <h1 className={styles.socialProofHeadline}>
          3,700 people just like you
        </h1>
        <p className={styles.socialProofSubheadline}>have chosen Clarivia</p>

        <div className={styles.avatarsGrid}>
          {avatarImages.map((src) => {
            const isFeatured = src.includes("10_16_48")
            const isMobileHide = src.includes("10_17_00")

            const wrapperClasses = [
              styles.avatarWrapper,
              isFeatured ? styles.featured : "",
              isMobileHide ? styles.mobileHide : "",
            ]
              .filter(Boolean)
              .join(" ")

            return (
              <div key={src} className={wrapperClasses}>
                <Image
                  src={`/images/feet/${src}`}
                  alt={isFeatured ? "Main user" : "User"}
                  width={80}
                  height={80}
                  className={styles.avatar}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className="button-container" onClick={handleSubmit}>
        <button className="primary-button" id="continueBtn">
          Continue
        </button>
      </div>
    </>
  )
}
