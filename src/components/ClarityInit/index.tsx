"use client"
import { analyticsConfig } from "@/config/analytics"
import { apiConfig } from "@/config/api"
import Clarity from "@microsoft/clarity"
import { useEffect } from "react"

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== "undefined" && !apiConfig.isProduction) {
      Clarity.init(analyticsConfig.clarityId)
    }
  }, [])

  return null
}
