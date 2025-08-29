// components/BottleOptions.tsx
"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import styles from "./medSelection.module.css"

interface BottleOption {
  id: string
  title: string
  subtitle: string
  image: string
  price: number
  originalPrice: number
  totalPrice?: number
  savings?: number
  features: string[]
  isPopular: boolean
  isBestValue: boolean
}

const options: BottleOption[] = [
  {
    id: "C-Mx5p1y8Zl0RqTnE6B7oJdK2GzVvF4hWs",
    title: "Try One",
    subtitle: "30 Day Supply",
    image: "/images/1bottle.webp",
    price: 99,
    originalPrice: 109,
    savings: undefined,
    features: ["90-Day Money Back Guarantee"],
    isPopular: false,
    isBestValue: false,
  },
  {
    id: "C-Qa3K9YrNf2Lb1wP5Zx8VcHt7GeS0jDoU",
    title: "Best Value",
    subtitle: "180 Day Supply",
    image: "/images/6bottles.webp",
    price: 49,
    originalPrice: 654,
    totalPrice: 294,
    savings: 360,
    features: [
      "FREE Doctor Visit",
      "FREE US Shipping",
      "90-Day Money Back Guarantee",
    ],
    isPopular: false,
    isBestValue: true,
  },
  {
    id: "ZXMO2kTAVvmdJXSeI6Q7h2yi0lfD4Mu7",
    title: "Most Popular",
    subtitle: "90 Day Supply",
    image: "/images/3bottles.webp",
    price: 69,
    originalPrice: 327,
    totalPrice: 177,
    savings: 150,
    features: [
      "FREE Doctor Visit",
      "FREE US Shipping",
      "90-Day Money Back Guarantee",
    ],
    isPopular: true,
    isBestValue: false,
  },
]

export const MedSelection = ({
  onAnswer,
}: {
  onAnswer: (id: string) => void
}) => {
  const handleBuyClick = (productId: string) => {
    onAnswer(productId)
  }

  return (
    <section className={styles.bottleOptionsRow}>
      {options.map((option) => (
        <div key={option.id} className={styles.bottleOptionCol}>
          <div
            className={`${styles.bottleCard} ${
              option.isBestValue ? styles.bestValue : ""
            }`}
          >
            <div
              className={`${styles.header} ${
                option.isBestValue
                  ? styles.headerBestValue
                  : styles.headerDefault
              }`}
            >
              <h3 className={styles.title}>{option.title}</h3>
              <p className={styles.subtitle}>{option.subtitle}</p>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src={option.image}
                alt={`${option.title} bottles`}
                width={275}
                height={275}
                className={styles.productImage}
                priority={option.isBestValue} // Priority load for best value
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAAxEhkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>

            <div className={styles.pricing}>
              <span
                className={`${styles.price} ${
                  option.isBestValue ? styles.priceBestValue : ""
                }`}
              >
                ${option.price}
              </span>
              <span className={styles.perBottle}>Per Bottle</span>
            </div>

            {option.savings && (
              <p className={styles.savings}>YOU SAVE ${option.savings}</p>
            )}

            <button
              onClick={() => handleBuyClick(option.id)}
              className={styles.buyButton}
              type="button"
              aria-label={`Buy ${option.title} for $${
                option.totalPrice || option.price
              }`}
            >
              Buy Now
            </button>

            <div className={styles.features}>
              {option.features.map((feature, index) => (
                <p key={index} className={styles.feature}>
                  <span className={styles.checkmark}>✓</span> {feature}
                </p>
              ))}
            </div>

            <div className={styles.total}>
              <p className={styles.totalText}>
                TOTAL:{" "}
                <s className={styles.strikethrough}>${option.originalPrice}</s>{" "}
                <strong
                  className={
                    option.isBestValue
                      ? styles.totalPriceBestValue
                      : styles.totalPrice
                  }
                >
                  ${option.totalPrice || option.price}
                </strong>
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
