"use client"

import Image from "next/image"
import styles from "./Hero.module.css"

const features = [
  {
    icon: "/images/i1.png",
    text: "Attacks stubborn fungus at the source.",
  },
  {
    icon: "/images/i2.png",
    text: "Safe topical cream avoids risks of oral meds.*",
  },
  {
    icon: "/images/i3.png",
    text: "No insurance, lab tests, or doctor appointments needed*",
  },
  {
    icon: "/images/i4.png",
    text: "Find out if you’re approved in about 90 seconds.",
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
            Treat Toenail Fungus Today: Get Clearer, Healthier Nails with
            Topical Itraconazole + Terbinafine
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
          <a href="#bottle-options" className="buy-now-button">
            Buy Now
          </a>
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
