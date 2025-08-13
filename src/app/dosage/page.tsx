"use client"
import React from "react"
import Head from "next/head"
// import { Header } from "./components/Header"
// import Hero from "../components/Hero"
// import LogoCarousel from "../components/LogoCarousel"
// import VideoSection from "../components/VideoSection"
// import HowItWorks from "../components/HowItWorks"
// import Testimonials from "../components/Testimonials"
// import MedicationInfo from "../components/MedicationInfo"
// import HowItWorksDetail from "../components/HowItWorksDetail"
// import ClinicalEvidence from "../components/ClinicalEvidence"
// import Benefits from "../components/Benefits"
// import WhyClarivia from "../components/WhyClarivia"
// import BottleOptions from "../components/BottleOptions"
// import FAQ from "../components/FAQ"
// import Footer from "../c"
import { Header, Hero, Featured, TrustedBy, HowItWorks } from "./components"

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

        {/* <LogoCarousel />
        <VideoSection />
        <Testimonials />
        <MedicationInfo />
        <HowItWorksDetail />
        <ClinicalEvidence />
        <Benefits />
        <WhyClarivia /> */}
        {/* <Medications /> */}
        {/* <FAQ />
        <Footer /> */}
      </main>
    </>
  )
}

export default Home
