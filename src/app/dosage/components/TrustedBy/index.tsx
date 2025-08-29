import styles from "./trustedBy.module.css"

import Image from "next/image"

interface CarouselItemProps {
  href: string
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const CarouselItem = ({
  href,
  src,
  alt,
  width = 200,
  height = 100,
  className = "",
}: CarouselItemProps) => {
  return (
    <li className={styles.logoCarouselItem}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${styles.logoImage} ${className}`}
        />
      </a>
    </li>
  )
}

const logos = [
  {
    href: "https://bit.ly/3PmzzDw",
    src: "/images/trusted-by/ap-logo.png",
    alt: "AP Logo",
  },
  {
    href: "https://bit.ly/45Vsu3P",
    src: "/images/trusted-by/yahoo-logo.png",
    alt: "Yahoo Logo",
  },
  {
    href: "https://bit.ly/3rmbhS3",
    src: "/images/trusted-by/abc-logo.png",
    alt: "ABC Logo",
  },
  {
    href: "https://bit.ly/3rmb9Sz",
    src: "/images/trusted-by/cbs-logo.png",
    alt: "CBS Logo",
  },
  {
    href: "https://bit.ly/3ZlnaEc",
    src: "/images/trusted-by/foxnews-logo.png",
    alt: "Fox News Logo",
  },
  {
    href: "https://bit.ly/45TPSyt",
    src: "/images/trusted-by/bloomberg-logo.png",
    alt: "Bloomberg Logo",
  },
  {
    href: "https://bit.ly/3ZpvlzF",
    src: "/images/trusted-by/laweekly-logo.png",
    alt: "LA Weekly Logo",
  },
  {
    href: "https://bit.ly/3PIP3TH",
    src: "/images/trusted-by/ktla5-logo.png",
    alt: "KTLA 5 Logo",
  },
  {
    href: "https://bit.ly/3ZoLzJ7",
    src: "/images/trusted-by/marketwatch-logo.png",
    alt: "MarketWatch Logo",
  },
  {
    href: "https://bit.ly/48lBikV",
    src: "/images/trusted-by/gdgritdaily-logo.png",
    alt: "Grit Daily Logo",
  },
]

export const TrustedBy = () => {
  return (
    <div
      className={`${styles.bgBlue} ${styles.carousel} ${styles.offerCarousel}`}
    >
      <div className={styles.leftPartShadow}></div>
      <div className={`${styles.leftPartShadow} ${styles.right}`}></div>

      <div className={styles.logoCarouselWrap}>
        <div className={styles.series}>
          <ul className={styles.logoCarousel}>
            {logos.map((logo, index) => (
              <CarouselItem key={`series1-${index}`} {...logo} />
            ))}
          </ul>
        </div>

        <div className={styles.series}>
          <ul className={styles.logoCarousel}>
            {logos.map((logo, index) => (
              <CarouselItem key={`series2-${index}`} {...logo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
