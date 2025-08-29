"use client"

import Image from "next/image"
import styles from "./Hero.module.css"

const features = [
  {
    icon: "/images/i1.png",
    text: "Targets Nail Fungus Where It Starts.",
  },
  {
    icon: "/images/i2.png",
    text: "Topical Delivery Designed to Minimize Systemic Side Effects.*",
  },
  {
    icon: "/images/i3.png",
    text: "No insurance, lab tests, or doctor appointments needed*",
  },
  {
    icon: "/images/i4.png",
    text: "Simply Choose Your Desired Prescription Option Below.",
  },
]

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <p className={styles.subheading}>
            Trusted by <span className={styles.highlight}>U.S. Physicians</span>{" "}
            and Pharmacies and Available Nationwide.
          </p>

          <h1 className={styles.heading}>
          Congratulations! You qualify for Clarivia: Prescription Strength Toenail Fungus Medication.
          </h1>

          <div className={styles.features}>
            {features.map((f, idx) => (
              <div className={styles.feature} key={idx}>
                <div className={styles.icon}>
                  <Image src={f.icon} alt="" width={25} height={25} />
                </div>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </div>
          {/* <a href="#bottle-options" className="buy-now-button">
            Buy Now
          </a> */}
        </div>
        {/* Right Column */}
        <div className={styles.rightCol}>
          <Image
            src="/images/Man-509.webp"
            alt="Male model"
            width={600}
            height={800}
            className={styles.mainImage}
          />
        </div>
      </div>
    </section>
  )
}
