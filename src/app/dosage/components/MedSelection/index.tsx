// components/BottleOptions.tsx
"use client"

import React, { useCallback, useState } from "react"
import Image from "next/image"
import styles from "./medSelection.module.css"
import { toast } from "react-toastify"
import { Loader } from "@/components/Loader"

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
    features: [
      "12 Month Doctor Prescribed Refill",
      "Billed Monthly",
      "90-Day Money Back Guarantee",
    ],
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
      "12 Month Doctor Prescribed Refill",
      "FREE US Shipping",
      "Billed Every 6 Months",
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
    price: 59,
    originalPrice: 327,
    totalPrice: 177,
    savings: 150,
    features: [
      "FREE Doctor Visit",
      "12 Month Doctor Prescribed Refill",
      "FREE US Shipping",
      "Billed Every 3 Months",
      "90-Day Money Back Guarantee",
    ],
    isPopular: true,
    isBestValue: false,
  },
]

export const MedSelection = () => {
  const [selectedMed, setSelectedMed] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const completeSession = useCallback(async (med: string) => {
    const params = new URLSearchParams(window.location.search)
    try {
      setIsSubmitting(true)
      setSelectedMed(med)
      const rtkcid = params.get("rtkcid")
      const response = await fetch(`/api/session/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          med,
          rtkcid,
        }),
      })

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const { url } = (await response.json()) as {
        url: string
      }

      const currentUrl = new URL(window.location.href)
      const newUrl = new URL(url, window.location.origin)

      currentUrl.searchParams.forEach((value, key) => {
        newUrl.searchParams.set(key, value)
      })

      window.location.assign(newUrl.toString())
    } catch (error) {
      toast.error("Something went wrong, try again!")
      console.log("something went wrong", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return (
    <div className={`${styles.mainContainer}`} id="bottle-options">
      <div className="containeer">
        <h2 className={styles.mainTitle}>Choose Your Package</h2>
        <p className={styles.description}>
          Select the best option for your treatment
        </p>
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
                  onClick={() => completeSession(option.id)}
                  className={styles.buyButton}
                  type="button"
                  aria-label={`Buy ${option.title} for $${
                    option.totalPrice || option.price
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting && selectedMed === option.id ? (
                    <Loader />
                  ) : (
                    "BUY NOW"
                  )}
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
                    <s className={styles.strikethrough}>
                      ${option.originalPrice}
                    </s>{" "}
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
      </div>
    </div>
  )
}
