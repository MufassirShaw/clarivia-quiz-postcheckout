"use client"

import React from "react"
import Image from "next/image"
import styles from "./Medications.module.css"

interface BottleOptionProps {
  title: string
  subtitle: string
  price: string
  originalPrice?: string
  savings?: string
  image: string
  features: string[]
  total: string
  originalTotal?: string
  medId: string
  isPopular?: boolean
  isBestValue?: boolean
}

const BottleOption: React.FC<BottleOptionProps> = ({
  title,
  subtitle,
  price,
  originalPrice,
  savings,
  image,
  features,
  total,
  originalTotal,
  medId,
  isPopular,
  isBestValue,
}) => {
  const handlePurchase = () => {
    const defaultUrl =
      "https://buy.getclarivia.com/checkout?med=ZXMO2kTAVvmdJXSeI6Q7h2yi0lfD4Mu7"
    const urlParams = new URLSearchParams(window.location.search)
    const dsLink = urlParams.get("ds_link")

    const targetUrl = dsLink ? decodeURIComponent(dsLink) : defaultUrl
    const targetUrlObj = new URL(targetUrl)
    targetUrlObj.searchParams.set("med", medId)

    window.location.href = targetUrlObj.toString()
  }

  return (
    <div className={`${styles.option} ${isBestValue ? styles.bestValue : ""}`}>
      <div
        className={`${styles.header} ${
          isBestValue ? styles.headerBestValue : ""
        }`}
      >
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>

      <div className={styles.imageContainer}>
        <Image src={image} alt={title} width={275} height={275} />
      </div>

      <div className={styles.pricing}>
        <span className={styles.price}>${price}</span>
        <span className={styles.perBottle}>Per Bottle</span>
      </div>

      {savings && <p className={styles.savings}>YOU SAVE {savings}</p>}

      <button
        onClick={handlePurchase}
        className={`btn-primary ${styles.buyButton}`}
      >
        Buy Now
      </button>

      <div className={styles.features}>
        {features.map((feature, index) => (
          <p key={index}>✓ {feature}</p>
        ))}
      </div>

      <div className={styles.total}>
        <p>
          TOTAL:{" "}
          {originalTotal && <s style={{ color: "#999" }}>{originalTotal}</s>}
          <strong className={isBestValue ? styles.totalBestValue : ""}>
            {" "}
            {total}
          </strong>
        </p>
      </div>
    </div>
  )
}

export const Medications: React.FC = () => {
  return (
    <section id="bottle-options" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Choose Your Package</h3>
          <p>Select the best option for your treatment</p>
        </div>

        <div className={styles.options}>
          <BottleOption
            title="Try One"
            subtitle="30 Day Supply"
            price="99"
            image="/images/1bottle.webp"
            features={[
              "12 Month Doctor Prescribed Refill",
              "Billed Monthly",
              "90-Day Money Back Guarantee"
            ]}
            total="$99"
            originalTotal="$109"
            medId="C-Mx5p1y8Zl0RqTnE6B7oJdK2GzVvF4hWs"
          />

          <BottleOption
            title="Best Value"
            subtitle="180 Day Supply"
            price="49"
            savings="$360"
            image="/images/6bottles.webp"
            features={[
              "FREE Doctor Visit",
              "12 Month Doctor Prescribed Refill",
              "FREE US Shipping",
              "Billed Every 6 Months",
              "90-Day Money Back Guarantee",
            ]}
            total="$294"
            originalTotal="$654"
            medId="C-Qa3K9YrNf2Lb1wP5Zx8VcHt7GeS0jDoU"
            isBestValue
          />

          <BottleOption
            title="Most Popular"
            subtitle="90 Day Supply"
            price="69"
            savings="$150"
            image="/images/3bottles.webp"
            features={[
              "FREE Doctor Visit",
              "12 Month Doctor Prescribed Refill",
              "FREE US Shipping",
              "Billed Every 3 Months",
              "90-Day Money Back Guarantee",
            ]}
            total="$177"
            originalTotal="$327"
            medId="ZXMO2kTAVvmdJXSeI6Q7h2yi0lfD4Mu7"
            isPopular
          />
        </div>
      </div>
    </section>
  )
}
