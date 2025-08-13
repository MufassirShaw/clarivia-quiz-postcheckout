import styles from "./Featured.module.css"
import Image from "next/image"

interface FeatureItemProps {
  icon: string
  title: string
  description: string
}

export default function FeatureItem({
  icon,
  title,
  description,
}: FeatureItemProps) {
  return (
    <div className={styles.featureItem}>
      <Image
        src={icon}
        alt={title}
        width={48}
        height={48}
        className={styles.icon}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}

const features = [
  {
    icon: "/images/blue-icon1.png",
    title: "Achieve Visibly Clearer Nails",
    description: "With Prescription Topical Itraconazole & Terbinafine",
  },
  {
    icon: "/images/blue-icon2.png",
    title: "Reach the Hidden Infection",
    description:
      "Advanced DMSO formula penetrates the nail barrier, a common failure point for standard topicals.",
  },
  {
    icon: "/images/blue-icon3.png",
    title: "Avoids Systemic Side Effects",
    description:
      "Targeted topical treatment minimizes risks associated with oral antifungal medications.*",
  },
  {
    icon: "/images/blue-icon4.png",
    title: "A Brand You Can Trust",
    description: "Clarivia works with leading U.S. Doctors and Pharmacies.",
  },
]

export const Featured = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.videoCol}>
          <Image
            src="/images/featured_section.gif"
            alt="Product demonstration"
            width={600}
            height={400}
            className={styles.gifImage}
            priority
            unoptimized
          />
        </div>
        <div className={styles.featuresCol}>
          <div className={styles.grid}>
            {features.map((feature, index) => (
              <FeatureItem
                key={`feature-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
