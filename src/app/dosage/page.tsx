"use client"
import React from "react"
import Head from "next/head"
import {
  Header,
  Hero,
  Featured,
  TrustedBy,
  HowItWorks,
  Testimonials,
  MedicationWork,
  PoweredBy,
  WhyUs,
} from "./components"

import "./dosage.css"

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Get Clarivia - Toenail Fungus Treatment</title>
        <meta
          name="description"
          content="Treat Toenail Fungus Today: Get Clearer, Healthier Nails with Topical Itraconazole + Terbinafine"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <div className="bg_white">
          <Header />
          <div className="container">
            <Hero />
          </div>
        </div>
        <div className="bg_colorBlue">
          <div className="container no-padding">
            <TrustedBy />
          </div>
        </div>
        <Featured />
        <HowItWorks />
        <Testimonials />
        <MedicationWork />
        <PoweredBy />
        <WhyUs />
      </main>
    </>
  )
}

export default Home
