import Image from "next/image"
import { Carousel } from "react-responsive-carousel"
import styles from "./testimonal.module.css"

const slides = [
  {
    className: styles.slide3,
    src: "/images/slide2-img(2).png",
    alt: "Slide 1",
  },
  {
    className: styles.slide2,
    src: "/images/slide5-img(2).png",
    alt: "Slide 2",
  },
  {
    className: styles.slide,
    src: "/images/bf3(1).png",
    alt: "Slide 3",
  },
]

interface CarouselItemProps {
  src: string
  alt?: string
  className?: string
}

function CarouselItem({ src, alt = "", className }: CarouselItemProps) {
  return (
    <div className={className || styles.slide}>
      <Image
        src={src}
        alt={alt}
        width={1150}
        height={571}
        className={styles.image}
        priority={false}
      />
    </div>
  )
}

export const Testimonials = () => {
  return (
    <div className={`container ${styles.mainContainer}`}>
      {/* carousel section */}
      <div className={styles.carouselContainer}>
        <div className={styles.carouselHeader}>
          <p className={styles.mainTitle}>
            Join <span>The Thousands</span>
            <br />
            Seeing Real Results
          </p>

          <div className={styles.reviews}>
            <h2 className="">4.6</h2>
            <div>
              <Image
                src="/images/star.png"
                loading="lazy"
                alt="stars image"
                className="image-15"
                height={20}
                width={120}
              />
              <p className="">500+ Reviews</p>
            </div>
          </div>
        </div>
        <Carousel
          autoPlay
          showArrows={false}
          infiniteLoop
          showStatus={false}
          className="testimonial__carousel"
        >
          {slides.map((slide, index) => (
            <CarouselItem key={index} {...slide} />
          ))}
        </Carousel>
      </div>

      <div className={styles.recommendationContainer}>
        <p className={styles.recommendationTitle}>
          Two Prescription <br />
          <em>
            Antifungals In <br /> One Solution
          </em>
        </p>
        <div className={styles.card}>
          <div>
            <h3>
              Itraconazole
              <br /> Terbinafine
              <br /> DMSO
            </h3>
            <p>
              Kills common fungus types by targeting cell walls + penetrates
              nail to deliver medicine
            </p>
            <a href="#bottle-options" className="buy-now-button">
              Buy Now
            </a>
          </div>
          <Image
            width={65}
            height={96}
            src={"/images/1bottle3month.webp"}
            alt="1bottle 3month"
          />
        </div>
      </div>
    </div>
  )
}
